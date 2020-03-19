import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  
  public url: string  = 'https://github.com/lucaslombardif'

  constructor(public navCtrl: NavController, public navParams: NavParams, public iab: InAppBrowser) {
  }

  ionViewDidLoad() {
    //const browser = this.iab.create(this.url, '_blank');
    //browser.show();
    console.log('In long time a go...')
  }

}
