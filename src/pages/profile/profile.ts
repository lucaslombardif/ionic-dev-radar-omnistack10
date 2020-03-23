import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  public url: string = 'https://github.com'

  constructor(public navCtrl: NavController, public navParams: NavParams, public iab: InAppBrowser) {
  }

  ionViewDidLoad() {
    this.openGitHubProfile();
  }

  openGitHubProfile() {
    let username = this.navParams.data;
    const browser = this.iab.create(this.url + `/${username}`, '_blank');
    browser.show();
  }

}
