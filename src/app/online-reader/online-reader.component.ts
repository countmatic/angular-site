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

  token = 'undef';

  countersModel: CounterModel[] = [{'name': 'test', 'value': 1}, {'name': 'other', 'value': 324}];

  constructor(private countmaticApiService: CountmaticApiService) {
  }

  onTokenChanged(token: string) {
    this.token = token;
    this.countmaticApiService.getCurrentReading(this.token).then((c: CounterModel[]) => this.countersModel = c);
  }

  ngOnInit() {
  }

}
