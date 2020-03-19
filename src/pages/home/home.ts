import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  map: any;
  public devs: any = [];
  public currentRegion: {
    latitude,
    longitude
  }

  public usernames: any = [];
  public techs: string = 'Ionic';

  constructor(public navCtrl: NavController, public api: ApiProvider) { }

  async ionViewDidLoad() {

    this.devs = await this.api.getDevs() || [];
    
    for (let x in this.devs) { 
      this.usernames.push(this.devs[x].github_username);
    }

    console.log(this.usernames);

    const position = new google.maps.LatLng(-27.210794819883088, -49.63724979182513);

    const mapOptions = {
      zoom: 15,
      center: position,
      disableDefaultUI: true
    }

    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    const marker = new google.maps.Marker({
      position: position,
      map: this.map,
      //Titulo
      title: 'Minha posição',
      //Animção
      animation: google.maps.Animation.DROP, // BOUNCE
    });
  }

}
