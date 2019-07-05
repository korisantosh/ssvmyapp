import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorktaskService, Task } from 'src/app/worktask.service';
@Component({
  selector: 'app-worklog',
  templateUrl: './worklog.component.html',
  styleUrls: ['./worklog.component.scss']
})
export class WorklogComponent implements OnInit {
  workLogs;
  constructor(
    private route: ActivatedRoute,
    private apiService: WorktaskService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.apiService.getWorkLogs(params.get('id')).subscribe(data => {
        this.workLogs = data;
      });
    });
  }

}
