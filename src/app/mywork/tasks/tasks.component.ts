import { Component, OnInit } from '@angular/core';
import { WorktaskService } from '../../worktask.service';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styles: []
})
export class TasksComponent implements OnInit {
  articles;
  constructor(private apiService: WorktaskService) { }

  ngOnInit() {
    this.apiService.getTasks().subscribe((data) => {
      console.log(data);
      this.articles = data;
    });
  }

}
