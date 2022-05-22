import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const url = 'http://localhost:3000/blogs';
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };


@Injectable({
  providedIn: 'root'
})
export class blogService {
  constructor(private http: HttpClient) { }

  addblog(data): Observable<any> {
    return this.http.post(url, data);
  }
  editblog(id, data): Observable<any> {
    return this.http.put(`${url}/${id}`, data);
  }
  deleteblog(id): Observable<any> {
    return this.http.delete(`${url}/${id}`, httpOptions);
  }
  getblog(id): Observable<any> {
    return this.http.get(`${url}/${id}`, httpOptions);
  }
  getAllblogs(data): Observable<any> {
    return this.http.post(`${url}/all`, data, httpOptions);
  }
}
