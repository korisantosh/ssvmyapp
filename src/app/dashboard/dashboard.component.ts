import { Component, OnInit } from '@angular/core';
import { WorktaskService } from '../worktask.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  ticketsLists;
  constructor(private apiService: WorktaskService) { }

  ngOnInit() {
    // this.apiService.getNews().subscribe((data) => {
    //   console.log(data);
    //   this.articles = data['articles'];
    // });
    this.apiService.getTickets().subscribe((data) => {
      console.log(data);
      this.ticketsLists = data;
    });
  }

}
