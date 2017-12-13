import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";

@Component({
  selector: 'app-token-input-form',
  templateUrl: './token-input-form.component.html',
  styleUrls: ['./token-input-form.component.css']
})
export class TokenInputFormComponent implements OnInit {

  private token = '';
  private store = false;
  private oldTokens : string[];

  @Output() onTokenChanged = new EventEmitter<string>();

  constructor(private activatedRoute: ActivatedRoute) {
    console.log("Hello TokenInputFormComponent constructor");
  }

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

  onSubmit() {
    console.log("Hello TokenInputFormComponent onSubmit");
    if (this.store) {
      console.log("TokenInputFormComponent storing input");
      let n = this.oldTokens.unshift(this.token);
      if (n > 10) {
        this.oldTokens = this.oldTokens.slice(0, 9);
      }
      localStorage.setItem('oldTokens', JSON.stringify(this.oldTokens));
    }
    this.onTokenChanged.emit(this.token);
  }

}
