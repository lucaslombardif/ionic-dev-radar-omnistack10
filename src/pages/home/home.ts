import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  map: any;
  public devs: any = [];
  techs: any = '';
  public position;
  public latitudeAtual;
  public longitudeAtual;

  constructor(
    public navCtrl: NavController,
    public api: ApiProvider,
    public iab: InAppBrowser,
    private geolocation: Geolocation
  ) { }

  ionViewDidLoad() {
    this.loadDevs();
  }

  public async loadDevs() {

    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitudeAtual = resp.coords.latitude;
      this.longitudeAtual = resp.coords.longitude;
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    this.devs = await this.api.searchDevs(this.latitudeAtual, this.longitudeAtual, this.techs || []);

    console.log(this.devs);

    const position = new google.maps.LatLng(this.latitudeAtual, this.longitudeAtual);

    const mapOptions = {
      zoom: 13,
      center: position,
      disableDefaultUI: true
    }

    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    for (let i in this.devs) {
      let icon = {
        url: this.devs[i].avatar_url,
        scaledSize: new google.maps.Size(50, 50),
        size: {
          width: 50,
          height: 50
        },
      };

      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(this.devs[i].location.coordinates[1], this.devs[i].location.coordinates[0]),
        map: this.map,
        icon: icon,
        title: this.devs[i].name,
        animation: google.maps.Animation.DROP, // BOUNCE
      });

      let contentString = '<div>' +
        '<div>' +
        '<h4>' + this.devs[i].name + '</h4>' +
        '</div>' +
        '<div>' +
        '<p>' + this.devs[i].bio + '</p>' +
        '<p>' + '<b> Techs: </b>' + this.devs[i].techs.join(', ') + '</p>' +
        '</div>' +
        '</div>';

      let infowindow = new google.maps.InfoWindow({
        content: contentString
      });

      marker.addListener('click', () => {
        //const browser = this.iab.create(`https://github.com/${this.devs[i].github_username}`, '_blank');
        //browser.show();
        infowindow.open(this.map, marker);
      });
    }

  }

}
