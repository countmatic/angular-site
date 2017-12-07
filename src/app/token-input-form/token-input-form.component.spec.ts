import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TokenInputFormComponent} from './token-input-form.component';

describe('TokenInputFormComponent', () => {
  let component: TokenInputFormComponent;
  let fixture: ComponentFixture<TokenInputFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TokenInputFormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenInputFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
