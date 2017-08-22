import { HttpModule } from '@angular/http';
import { TestBed, async, getTestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, ComponentFactoryResolver } from '@angular/core';

import { AppService } from '../shared';
import { AppComponent } from './app.component';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

describe('AppComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HttpModule],
      providers: [
        ComponentFactoryResolver,
        AppService,
        SlimLoadingBarService
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  
  it('should call ngOnInit', () => {
    getTestBed().compileComponents().then(() => { 
      const fixture = getTestBed().createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      spyOn(app, 'ngOnInit').and.callThrough();
    });
  });
  
});