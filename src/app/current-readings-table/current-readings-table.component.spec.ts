import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CurrentReadingsTableComponent} from './current-readings-table.component';

describe('CurrentReadingsTableComponent', () => {
  let component: CurrentReadingsTableComponent;
  let fixture: ComponentFixture<CurrentReadingsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CurrentReadingsTableComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentReadingsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
