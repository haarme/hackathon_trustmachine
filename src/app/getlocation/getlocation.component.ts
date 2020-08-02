import { Component } from '@angular/core';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  MyLocation
} from '@ionic-native/google-maps/ngx';
import { AlertController } from '@ionic/angular';
import { DataService } from '../data.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { environment } from 'src/environments/environment';
import { Guid } from '../guid';

@Component({
    selector: 'app-getlocation',
    templateUrl: 'getlocation.component.html',
    styleUrls: ['getlocation.component.scss']
})
export class GetLocationComponent {

  map: GoogleMap;
  markerlatlong: any;
  message: string;
  languageId: string;
  languageList: any[] = [
    {
      name: 'Abkhazian',
      shortName: 'ab'
    },
    {
      name: 'Afar',
      shortName: 'aa'
    },
    {
      name: 'Afrikaans',
      shortName: 'af'
    },
    {
      name: 'Albanian',
      shortName: 'sq'
    },
    {
      name: 'Amharic',
      shortName: 'am'
    },
    {
      name: 'Arabic',
      shortName: 'ar'
    },
    {
      name: 'Aragonese',
      shortName: 'an'
    },
    {
      name: 'Armenian',
      shortName: 'hy'
    },
    {
      name: 'Assamese',
      shortName: 'as'
    },
    {
      name: 'Avestan',
      shortName: 'ae'
    },
    {
      name: 'Aymara',
      shortName: 'ay'
    },
    {
      name: 'Azerbaijani',
      shortName: 'az'
    },
    {
      name: 'Bashkir',
      shortName: 'ba'
    },
    {
      name: 'Basque',
      shortName: 'eu'
    },
    {
      name: 'Belarusian',
      shortName: 'be'
    },
    {
      name: 'Bengali',
      shortName: 'bn'
    },
    {
      name: 'Bihari',
      shortName: 'bh'
    },
    {
      name: 'Bislama',
      shortName: 'bi'
    },
    {
      name: 'Bosnian',
      shortName: 'bs'
    },
    {
      name: 'Breton',
      shortName: 'br'
    },
    {
      name: 'Bulgarian',
      shortName: 'bg'
    },
    {
      name: 'Burmese',
      shortName: 'my'
    },
    {
      name: 'Catalan',
      shortName: 'ca'
    },
    {
      name: 'Chamorro',
      shortName: 'ch'
    },
    {
      name: 'Chechen',
      shortName: 'ce'
    },
    {
      name: 'Chinese',
      shortName: 'zh'
    },
    {
      name: 'Church Slavic; Slavonic; Old Bulgarian',
      shortName: 'cu'
    },
    {
      name: 'Chuvash',
      shortName: 'cv'
    },
    {
      name: 'Cornish',
      shortName: 'kw'
    },
    {
      name: 'Corsican',
      shortName: 'co'
    },
    {
      name: 'Croatian',
      shortName: 'hr'
    },
    {
      name: 'Czech',
      shortName: 'cs'
    },
    {
      name: 'Danish',
      shortName: 'da'
    },
    {
      name: 'Divehi; Dhivehi; Maldivian',
      shortName: 'dv'
    },
    {
      name: 'Dutch',
      shortName: 'nl'
    },
    {
      name: 'Dzongkha',
      shortName: 'dz'
    },
    {
      name: 'English',
      shortName: 'en'
    },
    {
      name: 'Esperanto',
      shortName: 'eo'
    },
    {
      name: 'Estonian',
      shortName: 'et'
    },
    {
      name: 'Faroese',
      shortName: 'fo'
    },
    {
      name: 'Fijian',
      shortName: 'fj'
    },
    {
      name: 'Finnish',
      shortName: 'fi'
    },
    {
      name: 'French',
      shortName: 'fr'
    },
    {
      name: 'Gaelic; Scottish Gaelic',
      shortName: 'gd'
    },
    {
      name: 'Galician',
      shortName: 'gl'
    },
    {
      name: 'Georgian',
      shortName: 'ka'
    },
    {
      name: 'German',
      shortName: 'de'
    },
    {
      name: 'Greek, Modern (1453-)',
      shortName: 'el'
    },
    {
      name: 'Guarani',
      shortName: 'gn'
    },
    {
      name: 'Gujarati',
      shortName: 'gu'
    },
    {
      name: 'Haitian; Haitian Creole',
      shortName: 'ht'
    },
    {
      name: 'Hausa',
      shortName: 'ha'
    },
    {
      name: 'Hebrew',
      shortName: 'he'
    },
    {
      name: 'Herero',
      shortName: 'hz'
    },
    {
      name: 'Hindi',
      shortName: 'hi'
    },
    {
      name: 'Hiri Motu',
      shortName: 'ho'
    },
    {
      name: 'Hungarian',
      shortName: 'hu'
    },
    {
      name: 'Icelandic',
      shortName: 'is'
    },
    {
      name: 'Ido',
      shortName: 'io'
    },
    {
      name: 'Indonesian',
      shortName: 'id'
    },
    {
      name: 'Interlingua (International Auxiliary Language Association)',
      shortName: 'ia'
    },
    {
      name: 'Interlingue',
      shortName: 'ie'
    },
    {
      name: 'Inuktitut',
      shortName: 'iu'
    },
    {
      name: 'Inupiaq',
      shortName: 'ik'
    },
    {
      name: 'Irish',
      shortName: 'ga'
    },
    {
      name: 'Italian',
      shortName: 'it'
    },
    {
      name: 'Japanese',
      shortName: 'ja'
    },
    {
      name: 'Javanese',
      shortName: 'jv'
    },
    {
      name: 'Kalaallisut',
      shortName: 'kl'
    },
    {
      name: 'Kannada',
      shortName: 'kn'
    },
    {
      name: 'Kashmiri',
      shortName: 'ks'
    },
    {
      name: 'Kazakh',
      shortName: 'kk'
    },
    {
      name: 'Khmer',
      shortName: 'km'
    },
    {
      name: 'Kikuyu; Gikuyu',
      shortName: 'ki'
    },
    {
      name: 'Kinyarwanda',
      shortName: 'rw'
    },
    {
      name: 'Kirghiz',
      shortName: 'ky'
    },
    {
      name: 'Komi',
      shortName: 'kv'
    },
    {
      name: 'Korean',
      shortName: 'ko'
    },
    {
      name: 'Kuanyama; Kwanyama',
      shortName: 'kj'
    },
    {
      name: 'Kurdish',
      shortName: 'ku'
    },
    {
      name: 'Lao',
      shortName: 'lo'
    },
    {
      name: 'Latin',
      shortName: 'la'
    },
    {
      name: 'Latvian',
      shortName: 'lv'
    },
    {
      name: 'Limburgan; Limburger; Limburgish',
      shortName: 'li'
    },
    {
      name: 'Lingala',
      shortName: 'ln'
    },
    {
      name: 'Lithuanian',
      shortName: 'lt'
    },
    {
      name: 'Luxembourgish; Letzeburgesch',
      shortName: 'lb'
    },
    {
      name: 'Macedonian',
      shortName: 'mk'
    },
    {
      name: 'Malagasy',
      shortName: 'mg'
    },
    {
      name: 'Malay',
      shortName: 'ms'
    },
    {
      name: 'Malayalam',
      shortName: 'ml'
    },
    {
      name: 'Maltese',
      shortName: 'mt'
    },
    {
      name: 'Manx',
      shortName: 'gv'
    },
    {
      name: 'Maori',
      shortName: 'mi'
    },
    {
      name: 'Marathi',
      shortName: 'mr'
    },
    {
      name: 'Marshallese',
      shortName: 'mh'
    },
    {
      name: 'Moldavian',
      shortName: 'mo'
    },
    {
      name: 'Mongolian',
      shortName: 'mn'
    },
    {
      name: 'Nauru',
      shortName: 'na'
    },
    {
      name: 'Navaho, Navajo',
      shortName: 'nv'
    },
    {
      name: 'Ndebele, North',
      shortName: 'nd'
    },
    {
      name: 'Ndebele, South',
      shortName: 'nr'
    },
    {
      name: 'Ndonga',
      shortName: 'ng'
    },
    {
      name: 'Nepali',
      shortName: 'ne'
    },
    {
      name: 'Northern Sami',
      shortName: 'se'
    },
    {
      name: 'Norwegian',
      shortName: 'no'
    },
    {
      name: 'Norwegian Bokmal',
      shortName: 'nb'
    },
    {
      name: 'Norwegian Nynorsk',
      shortName: 'nn'
    },
    {
      name: 'Nyanja; Chichewa; Chewa',
      shortName: 'ny'
    },
    {
      name: 'Occitan (post 1500); Provencal',
      shortName: 'oc'
    },
    {
      name: 'Oriya',
      shortName: 'or'
    },
    {
      name: 'Oromo',
      shortName: 'om'
    },
    {
      name: 'Ossetian; Ossetic',
      shortName: 'os'
    },
    {
      name: 'Pali',
      shortName: 'pi'
    },
    {
      name: 'Panjabi',
      shortName: 'pa'
    },
    {
      name: 'Persian',
      shortName: 'fa'
    },
    {
      name: 'Polish',
      shortName: 'pl'
    },
    {
      name: 'Portuguese',
      shortName: 'pt'
    },
    {
      name: 'Pushto',
      shortName: 'ps'
    },
    {
      name: 'Quechua',
      shortName: 'qu'
    },
    {
      name: 'Raeto-Romance',
      shortName: 'rm'
    },
    {
      name: 'Romanian',
      shortName: 'ro'
    },
    {
      name: 'Rundi',
      shortName: 'rn'
    },
    {
      name: 'Russian',
      shortName: 'ru'
    },
    {
      name: 'Samoan',
      shortName: 'sm'
    },
    {
      name: 'Sango',
      shortName: 'sg'
    },
    {
      name: 'Sanskrit',
      shortName: 'sa'
    },
    {
      name: 'Sardinian',
      shortName: 'sc'
    },
    {
      name: 'Serbian',
      shortName: 'sr'
    },
    {
      name: 'Shona',
      shortName: 'sn'
    },
    {
      name: 'Sichuan Yi',
      shortName: 'ii'
    },
    {
      name: 'Sindhi',
      shortName: 'sd'
    },
    {
      name: 'Sinhala; Sinhalese',
      shortName: 'si'
    },
    {
      name: 'Slovak',
      shortName: 'sk'
    },
    {
      name: 'Slovenian',
      shortName: 'sl'
    },
    {
      name: 'Somali',
      shortName: 'so'
    },
    {
      name: 'Sotho, Southern',
      shortName: 'st'
    },
    {
      name: 'Spanish; Castilian',
      shortName: 'es'
    },
    {
      name: 'Sundanese',
      shortName: 'su'
    },
    {
      name: 'Swahili',
      shortName: 'sw'
    },
    {
      name: 'Swati',
      shortName: 'ss'
    },
    {
      name: 'Swedish',
      shortName: 'sv'
    },
    {
      name: 'Tagalog',
      shortName: 'tl'
    },
    {
      name: 'Tahitian',
      shortName: 'ty'
    },
    {
      name: 'Tajik',
      shortName: 'tg'
    },
    {
      name: 'Tamil',
      shortName: 'ta'
    },
    {
      name: 'Tatar',
      shortName: 'tt'
    },
    {
      name: 'Telugu',
      shortName: 'te'
    },
    {
      name: 'Thai',
      shortName: 'th'
    },
    {
      name: 'Tibetan',
      shortName: 'bo'
    },
    {
      name: 'Tigrinya',
      shortName: 'ti'
    },
    {
      name: 'Tonga (Tonga Islands)',
      shortName: 'to'
    },
    {
      name: 'Tsonga',
      shortName: 'ts'
    },
    {
      name: 'Tswana',
      shortName: 'tn'
    },
    {
      name: 'Turkish',
      shortName: 'tr'
    },
    {
      name: 'Turkmen',
      shortName: 'tk'
    },
    {
      name: 'Twi',
      shortName: 'tw'
    },
    {
      name: 'Uighur',
      shortName: 'ug'
    },
    {
      name: 'Ukrainian',
      shortName: 'uk'
    },
    {
      name: 'Urdu',
      shortName: 'ur'
    },
    {
      name: 'Uzbek',
      shortName: 'uz'
    },
    {
      name: 'Vietnamese',
      shortName: 'vi'
    },
    {
      name: 'Volapuk',
      shortName: 'vo'
    },
    {
      name: 'Walloon',
      shortName: 'wa'
    },
    {
      name: 'Welsh',
      shortName: 'cy'
    },
    {
      name: 'Western Frisian',
      shortName: 'fy'
    },
    {
      name: 'Wolof',
      shortName: 'wo'
    },
    {
      name: 'Xhosa',
      shortName: 'xh'
    },
    {
      name: 'Yiddish',
      shortName: 'yi'
    },
    {
      name: 'Yoruba',
      shortName: 'yo'
    },
    {
      name: 'Zhuang; Chuang',
      shortName: 'za'
    },
    {
      name: 'Zulu',
      shortName: 'zu'
    }
   ];

  constructor(
    public dataService: DataService,
    private geolocation: Geolocation,
    private storage: Storage,
    private router: Router,
    public alertCtrl: AlertController) {
    }

  ionViewDidEnter() {
    this.dataService.languageId$.subscribe(x => {
      this.languageId = x;
      // alert(this.languageId);
    });
    if (this.dataService.userCurrentLocation === undefined) {
      this.getCurrentLocation();
    } else {
      this.loadMap();
    }
  }

  public getCurrentLocation(): void {
    this.dataService.loading$.next(true);
    const options = {timeout: 10000, enableHighAccuracy: true};
    this.geolocation.getCurrentPosition(options)
        .then((resp) => {
            this.dataService.loading$.next(false);
            this.dataService.userCurrentLocation = resp.coords;
            this.loadMap();
        }).catch((error) => {
            this.dataService.loading$.next(false);
        });
}

  loadMap() {
    this.map = GoogleMaps.create('map_canvas', {
      camera: {
        target: {
          lat: this.dataService.userCurrentLocation.latitude,
          lng: this.dataService.userCurrentLocation.longitude
        },
        zoom: 15
      },
      controls: {
        myLocationButton: true,
        myLocation: true
      }
    });

    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      console.log('map is ready');
    });

    this.map.on(GoogleMapsEvent.MY_LOCATION_CLICK).subscribe((location: MyLocation) => {
      const marker: Marker = this.map.addMarkerSync({
        title: ['Your current location:\n',
            'latitude:' + location.latLng.lat.toFixed(3),
            'longitude:' + location.latLng.lng.toFixed(3),
            'speed:' + location.speed,
            'time:' + location.time,
            'bearing:' + location.bearing].join('\n'),
        position: location.latLng,
        disableAutoPan: true,
      });
      marker.showInfoWindow();
    });
  }

  async setCurrentPinLocation() {
    this.dataService.loading$.next(true);
    const target = this.map.getCameraTarget();
    this.dataService.userCurrentLocation = target;
    const location = { latitude: target.lat, longitude: target.lng};
    this.storage.remove('usercurrentlocation');
    this.storage.set('usercurrentlocation', JSON.stringify(location));
  }

  next() {
    try {
      this.storage.clear();
      this.dataService.newUid = Guid.newGuid();
      this.storage.set('uid', this.dataService.newUid?.value).then(result => {
        const rootRef = firebase.database().ref();
        const documentRef = rootRef.child('vistahacka/userinfo/' + result);
        const document = {
          uid: result,
          languageId: this.languageId,
          location: this.map.getCameraTarget(),
          userType: this.dataService.userType,
        };
        documentRef.update(document);
        this.dataService.uid = result;
        this.storage.set('userType', this.dataService.userType);
        this.router.navigateByUrl('register');
      });
    } catch (error) {
      alert(error);
    }
  }

  login() {
    this.router.navigateByUrl('login');
  }
}
