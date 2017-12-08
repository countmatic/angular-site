import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {CounterModel} from './counter-model';


@Injectable()
export class CountmaticApiService {

  constructor(private http: Http) {
  }

  getCurrentReading(token: string): Promise<CounterModel[]> {
    return this.http.get('https://api.countmatic.io/v1/counter/current?token=' + token)
      .toPromise()
      .then(response => response.json() as CounterModel[]);
    //.catch((err) => this.handleError(err));
  }

  handleError(err) {
    console.log(err);
  }

}
