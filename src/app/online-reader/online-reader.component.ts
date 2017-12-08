import {Component, OnInit} from '@angular/core';
import {CounterModel} from '../counter-model';
import {CountmaticApiService} from '../countmatic-api.service';

@Component({
  selector: 'app-online-reader',
  providers: [CountmaticApiService],
  templateUrl: './online-reader.component.html',
  styleUrls: ['./online-reader.component.css']
})
export class OnlineReaderComponent implements OnInit {

  feedback = 'Enter token';
  token = '';

  countersModel: CounterModel[] = [];

  constructor(private countmaticApiService: CountmaticApiService) {
  }

  private err2Text(status: number): string {
    let rc = 'undefined';
    switch (status) {
      case 403: {
        rc = 'Forbidden, action not allowed with that token';
        break;
      }
      case 404: {
        rc = 'Not Found, unknown token';
        break;
      }
      default: {
        rc = 'Unknown code';
        break;
      }
    }

    return rc;
  }


  onTokenChanged(token: string) {
    this.token = token;
    this.countmaticApiService.getCurrentReading(this.token)
      .then((c: CounterModel[]) => {
        this.countersModel = c;
        this.feedback = 'Request successful';
      })
      .catch((err) => {
        this.feedback = this.err2Text(err.status);
        console.log(err);
      });
  }

  ngOnInit() {
  }

}
