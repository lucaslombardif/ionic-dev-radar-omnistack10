import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  map: any;
  public devs: any = [];
  public avatars: any = [];
  techs: any = 'HTML';

  constructor(public navCtrl: NavController, public api: ApiProvider, public iab: InAppBrowser) { }

  ionViewDidLoad() {
    this.loadDevs();
  }

  public async loadDevs() {

    this.devs = await this.api.searchDevs(-27.2111041, -49.6457925, this.techs || []);

    for (let x in this.devs) {
      this.avatars.push(this.devs[x].avatar_url);
    };

    console.log(this.devs);

    const position = new google.maps.LatLng(-27.2111041, -49.6457925);

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
      marker.addListener('click', () => {
        const browser = this.iab.create(`https://github.com/${this.devs[i].github_username}`, '_blank');
        browser.show();;
      });
    }

  }

}
