import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';

import { WorktaskService, Task } from 'src/app/worktask.service';
@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styles: []
})
export class TaskDetailsComponent implements OnInit {
  taskForm: FormGroup;
  taskDetail;
  constructor(
    private route: ActivatedRoute,
    private apiService: WorktaskService,
    private formBuilder: FormBuilder
  ) {
    this.taskForm = this.formBuilder.group({
      _id: ['', [Validators.required]],
      summary: ['', [Validators.required]],
      priority: ['', [Validators.required]],
      type: ['', [Validators.required]],
      createDate: ['', [Validators.required]],
      due: ['', [Validators.required]],
      modified: ['', [Validators.required]],
      key: ['', [Validators.required]]
    });
  }
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.apiService.getTaskDetail(params.get('id')).subscribe(data => {
        this.taskDetail = data;
      });
    });
  }
  onSubmit(customerData) {
    // Process checkout data here
    if (this.taskForm.valid) {
      alert('User form is valid!!');
      console.warn('Your order has been submitted', customerData);
      this.taskForm.reset();
    } else {
      alert('User form is not valid!!');
    }
  }
}
