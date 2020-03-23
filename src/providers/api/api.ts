import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiProvider {

  public apiURL = 'https://backend-omnistack-10.herokuapp.com';

  constructor(public http: HttpClient) {
    console.log('Hello ApiProvider Provider');
  }

  public async getDevs() {
    let devs = await this.http.get(this.apiURL + '/devs').toPromise();
    return devs;
  }

  public async searchDevs(latitude, longitude, techs) {
    //let latitude, longitude, techs;

    const response = await this.http.get(this.apiURL + '/search', {
      params: {
        latitude,
        longitude,
        techs,
      }
    }).toPromise();

    return response;
  }

}