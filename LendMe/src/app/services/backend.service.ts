import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  
  private baseUrl = 'http://127.0.0.1:8000/lendme/';

  constructor(private http: HttpClient) {}

  getItemCategories(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}itemcategories/`);
  }
  saveItem(item: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}items/`, item);
  }
  getItemByCategorySlug(categorySlug: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}items/?category_slug=${categorySlug}`);
  }

  getItemByCategoryId(categoryId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}items/?category_id=${categoryId}`);
  }

  getItemById(itemId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}items/${itemId}/`);
  }

  uploadProfilePicture(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('profile_picture', file);

    return this.http.post<any>(`${this.baseUrl}upload-profile-picture/`, formData);
  }

  getUserProfilePicture(userId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}user-profile-picture/${userId}/`);
  }

  getUserInfo(): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      return throwError('Access token is missing');
    }
    
    // Set headers with access token
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    });

    // Make GET request with headers
    return this.http.get<any>(`${this.baseUrl}user-info/`, { headers });
  }

}
