import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-worklogadd',
  templateUrl: './worklogadd.component.html',
  styleUrls: ['./worklogadd.component.scss']
})
export class WorklogaddComponent implements OnInit {
  worklogForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.worklogForm = this.fb.group({
      name: ['Benedict', Validators.required],
      email: ['', [Validators.required]],
      message: ['', [Validators.required]]
    });
  }

  ngOnInit() {
  }
  onSubmit(form: FormGroup) {
    console.log('Valid?', form.valid); // true or false
    console.log('Name', form.value.name);
    console.log('Email', form.value.email);
    console.log('Message', form.value.message);
  }
}
