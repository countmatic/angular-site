/*
 Copyright (c) Rainer Feike, 2017. Licensed under the MIT License.
 See LICENSE file in the project root for full license information.
*/
import {Component, OnInit} from '@angular/core';
import {CounterModel} from '../counter-model';
import {CountmaticApiService} from '../countmatic-api.service';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";

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

  constructor(private countmaticApiService: CountmaticApiService,
              private router: Router, private activatedRoute: ActivatedRoute) {
    console.log("Hello OnlineReaderComponent constructor");
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
    console.log("Hello OnlineReaderComponent onTokenChanged");
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
    console.log("Hello OnlineReaderComponent ngOnInit");
    let token = null;
    this.activatedRoute.queryParamMap.subscribe((next: ParamMap) => {
      token = next.get("token")
      if (token) {
        console.log(token);
        this.onTokenChanged(token);
      } else {
        console.log("no token given in url");
      }
    });
  }

}
