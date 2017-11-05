import { routerTransition } from './app.router.animations';
import { Router } from '@angular/router';
import { Employee } from './employees/model/employee';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  animations: [ routerTransition ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor() {
  }

  getState(outlet) {
    return outlet.activatedRouteData.state;
  }
}
