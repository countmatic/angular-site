/*
 Copyright (c) Rainer Feike, 2017. Licensed under the MIT License.
 See LICENSE file in the project root for full license information.
*/
import {Component, OnInit} from '@angular/core';
import {CounterModel} from '../counter-model';
import {CountmaticApiService} from '../countmatic-api.service';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";

/*
 Online reader for counter tokens with some memorial comfort.
 */
@Component({
  selector: 'app-online-reader',
  providers: [CountmaticApiService],
  templateUrl: './online-reader.component.html',
  styleUrls: ['./online-reader.component.css']
})
export class OnlineReaderComponent implements OnInit {

  // feedback of last action presented to the user
  feedback = 'Enter token';
  // current input content
  token = '';
  // current reading of the counters for this.token
  countersModel: CounterModel[] = [];

  constructor(private countmaticApiService: CountmaticApiService,
              private router: Router, private activatedRoute: ActivatedRoute) {
    console.log("Hello OnlineReaderComponent constructor");
  }

  /*
  Map error codes to informational text for the user
   */
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

  /*
   Respond to token changes from the input form by requesting content from the backend.
   Feed new input to the table's model - or show error msg
   */
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

  /*
  Check for query param "token" - if there's one, use it immediately.
   */
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
