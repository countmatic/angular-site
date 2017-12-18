/*
 Copyright (c) Rainer Feike, 2017. Licensed under the MIT License.
 See LICENSE file in the project root for full license information.
*/
import {Component, Input, OnInit} from '@angular/core';
import {CounterModel} from '../counter-model';

/*
 Just show a table of name/value pairs for the given input array of CounterModel.
 */
@Component({
  selector: 'app-current-readings-table',
  templateUrl: './current-readings-table.component.html',
  styleUrls: ['./current-readings-table.component.css']
})
export class CurrentReadingsTableComponent implements OnInit {

  @Input() counters: CounterModel[];

  constructor() {
  }

  ngOnInit() {
  }

}
