import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-token-input-form',
  templateUrl: './token-input-form.component.html',
  styleUrls: ['./token-input-form.component.css']
})
export class TokenInputFormComponent implements OnInit {


  submitted = false;
  token = '';
  @Output() onTokenChanged = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
    this.onTokenChanged.emit(this.token);
  }

}
