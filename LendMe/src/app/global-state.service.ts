import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalStateService {
  private globalData: any;

  constructor(private http: HttpClient) { }
 
  fetchData(): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      return throwError('Access token is missing');
    }
    const headers = { 'Authorization': `Bearer ${token}` };
     if (this.globalData) {
       return of(this.globalData);
     } else {
       return this.http.get('http://127.0.0.1:8000/lendme/user-info/', {headers}).pipe(
         tap(data => this.globalData = data)
       );
     }
  }
 
  getData(): any {
    this.fetchData();
     return this.globalData;
  }
}
