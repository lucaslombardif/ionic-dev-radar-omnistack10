import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiProvider {

  public apiURL = 'http://localhost:3333';

  constructor(public http: HttpClient) {
    console.log('Hello ApiProvider Provider');
  }

  public async getDevs() {
    let devs = await this.http.get(this.apiURL + '/devs').toPromise();
    return devs;
  }

  public async searchDevs() {
    let latitude, longitude, techs;

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