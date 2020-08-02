import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { ActionSheetController } from '@ionic/angular';
import * as firebase from 'firebase';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-photoupload',
  templateUrl: 'photoupload.component.html',
  styleUrls: ['photoupload.component.scss']
})
export class PhotoUploadComponent {

  public imageSrc: any;

  croppedImagepath = '';
  isLoading = false;

  imagePickerOptions = {
    maximumImagesCount: 1,
    quality: 50
  };

  private cameraOptions: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };

  constructor(
    public dataService: DataService,
    private router: Router,
    private camera: Camera,
    public actionSheetController: ActionSheetController,
    private file: File,
    private storage: Storage,
  ) { }

  next() {
    this.router.navigateByUrl('borrowerpersonalinfo');
  }

  async pickImage(selectedSourceType) {
    try {
      const options: CameraOptions = {
        quality: 50,
        sourceType: selectedSourceType,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true,
        allowEdit: true,
        targetHeight: 300,
        targetWidth: 300
      };

      const cameraInfo = await this.camera.getPicture(options);
      const blobInfo = await this.makeFileIntoBlob(cameraInfo);
      const uploadInfo: any = await this.uploadToFirebase(blobInfo);

      firebase.storage().ref('images/' + this.imageSrc).getDownloadURL().then((fileName) => {
        this.dataService.avatarUrl = fileName;
        this.saveToDB(fileName);
      });
    } catch (e) {
      console.log(e.message);
      alert('File Upload Error ' + e.message);
    }
  }

  makeFileIntoBlob(imagePath: string) {
    return new Promise((resolve, reject) => {
      let fileName = '';
      this.file
        .resolveLocalFilesystemUrl(imagePath)
        .then(fileEntry => {
          const { name, nativeURL } = fileEntry;
          const path = nativeURL.substring(0, nativeURL.lastIndexOf('/'));
          fileName = name;
          return this.file.readAsArrayBuffer(path, name);
        })
        .then(buffer => {
          const imgBlob = new Blob([buffer], {
            type: 'image/jpeg'
          });
          console.log(imgBlob.type, imgBlob.size);
          resolve({
            fileName,
            imgBlob
          });
        })
        .catch(e => reject(e));
    });
  }

  uploadToFirebase(imageBlobInfo: any) {
    return new Promise((resolve, reject) => {
      this.imageSrc = imageBlobInfo.fileName;
      const fileRef = firebase.storage().ref('images/' + imageBlobInfo.fileName);
      const uploadTask = fileRef.put(imageBlobInfo.imgBlob);
      uploadTask.on(
        'state_changed',
        (snapshot: any) => {
            console.log('snapshot progess ' + (snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          },
          error => {
            console.log(error);
            reject(error);
          },
          () => {
            resolve(uploadTask.snapshot);
          }
      );
    });
  }

  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Select Image source',
      buttons: [{
        text: 'Load from Library',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text: 'Use Camera',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }

  saveToDB(fileName: string) {
    this.storage.get('uid').then(result => {
      if (result) {
        const rootRef = firebase.database().ref();
        const documentRef = rootRef.child('vistahacka/userinfo/' + result);
        const document = {
          avatarUrl: fileName
        };
        this.storage.set('avatarUrl', fileName);
        documentRef.update(document);
        this.dataService.avatarUrl = fileName;
      }
    },
    () => this.dataService.presentErrorToast('Failed to get data'));
  }
}
