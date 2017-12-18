/*
 Copyright (c) Rainer Feike, 2017. Licensed under the MIT License.
 See LICENSE file in the project root for full license information.
*/
import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";

/*
 Simple form for token input and re-use from localStorage
 */
@Component({
  selector: 'app-token-input-form',
  templateUrl: './token-input-form.component.html',
  styleUrls: ['./token-input-form.component.css']
})
export class TokenInputFormComponent implements OnInit {

  // Current input field value
  token = '';
  // model for the store checkbox
  store = false;
  // re-useable tokens from history
  oldTokens: string[];

  // Event for changing input
  @Output() onTokenChanged = new EventEmitter<string>();

  constructor(private activatedRoute: ActivatedRoute) {
    console.log("Hello TokenInputFormComponent constructor");
  }

  // Check for a token in the query to copy it into the input field if present
  // and check for re-usable tokens from the localStorage
  ngOnInit() {
    console.log("Hello TokenInputFormComponent ngOnInit");
    let oldTokenStore = localStorage.getItem('oldTokens');
    if (null == oldTokenStore) {
      oldTokenStore = '[]';
    }
    this.oldTokens = JSON.parse(oldTokenStore);
    console.log("TokenInputFormComponent oldstuff");
    console.log(this.oldTokens);

    let urlToken = null;
    this.activatedRoute.queryParamMap.subscribe((next: ParamMap) => {
      urlToken = next.get("token")
      if (urlToken) {
        console.log(urlToken);
        this.token = urlToken;
      } else {
        console.log("no token given in url");
      }
    });
  }

  setToken(t: string) {
    this.token = t;
  }

  // submit token and opt. store in localHist
  onSubmit() {
    console.log("Hello TokenInputFormComponent onSubmit");
    if (this.store) {
      console.log("TokenInputFormComponent storing input");
      // first-in that token then slice to have a max of ten tokens in history
      let n = this.oldTokens.unshift(this.token);
      if (n > 10) {
        this.oldTokens = this.oldTokens.slice(0, 9);
      }
      localStorage.setItem('oldTokens', JSON.stringify(this.oldTokens));
    }
    this.onTokenChanged.emit(this.token);
  }

}
