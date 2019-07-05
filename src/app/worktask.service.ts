import { tap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface Task {
  _id?: string;
  summary: string;
  priority: number;
  createDate: string;
  modified: string;
  due: string;
  type: string;
  key: string;
}

@Injectable({
  providedIn: 'root'
})
export class WorktaskService {
  API_KEY = 'c53c4ede23504a9082f5b28c6352941a';
  BACKEND_URL = 'http://localhost:4202';
  constructor(private  httpClient: HttpClient) {}
  getNews() {
    return this.httpClient.get(`https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${this.API_KEY}`);
  }
  getTickets() {
    return this.httpClient.get(`${this.BACKEND_URL}/api/jira`);
  }
  getTasks() {
    return this.httpClient.get(`${this.BACKEND_URL}/api/tasks`);
  }
  getWorkLogs(ticketId) {
    return this.httpClient.get(`${this.BACKEND_URL}/api/worklogs/${ticketId}`);
  }
  getWorkLogDetails(ticketId, worklogId) {
    return this.httpClient.get(`${this.BACKEND_URL}/api/issue/${ticketId}/worklog/${worklogId}`);
  }
  getTaskDetail(id) {
    return this.httpClient.get(this.BACKEND_URL + '/api/task/' + id);
  }

}
