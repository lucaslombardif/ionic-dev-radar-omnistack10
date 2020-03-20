import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { ProfilePage } from '../profile/profile';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  map: any;
  public devs: any = [];
  public locations: any = [];
  public avatars: any = [];
  techs:any = 'HTML';

  constructor(public navCtrl: NavController, public api: ApiProvider) { }

  public async searchDevs(){
    this.devs = await this.api.searchDevs(-27.2111041, -49.6457925, this.techs) || []
    console.log(this.devs);
  }
  

  async ionViewDidEnter() {
    let icons;

    this.devs = await this.api.searchDevs(-27.2111041, -49.6457925, 'ReactJS') || [];

    console.log(this.techs);

    for (let x in this.devs) {
      this.avatars.push(this.devs[x].avatar_url);
      this.locations.push(this.devs[x].location.coordinates);
    };

    console.log(this.devs);

    const position = new google.maps.LatLng(this.locations[0][1], this.locations[0][0]);

    const mapOptions = {
      zoom: 14,
      center: position,
      disableDefaultUI: true
    }

    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    for (let i in this.locations) {
      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(this.locations[i][1], this.locations[i][0]),
        map: this.map,
        icon: icons,
        scaledSize: new google.maps.Size(10, 10),
        animation: google.maps.Animation.DROP, // BOUNCE
      });
      marker.addListener('click', () => {
        this.navCtrl.push('ProfilePage');
      });
    }

  }

}
