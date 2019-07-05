import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'App';
  routeLinks: any[];
  activeLinkIndex = -1;

  constructor(private router: Router) {
    this.routeLinks = [
      {
        label: 'Dashboard',
        link: './',
        index: 0
      },
      {
        label: 'My Work',
        link: './mywork',
        index: 1
      },
      {
        label: 'Others',
        link: './others',
        index: 2
      }
    ];
  }
  ngOnInit(): void {
    this.router.events.subscribe((res) => {
        this.activeLinkIndex = this.routeLinks.indexOf(this.routeLinks.find(tab => tab.link === '.' + this.router.url));
    });
}
}
