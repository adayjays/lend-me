import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
    
  private baseUrl = 'http://127.0.0.1:8000/lendme/';
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.setAuthorizationHeader();
  }

  private setAuthorizationHeader() {
    const token = localStorage.getItem('token');
    if (token) {
      this.headers = this.headers.set('Authorization', `Token ${token}`);
    }
  }

  private handleError(error: any) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = error.error || errorMessage;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  private getRequestOptions() {
    return { headers: this.headers };
  }

  getItemCategories(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}itemcategories/`, this.getRequestOptions()).pipe(
      catchError(this.handleError)
    );
  }

  saveItem(item: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}items/`, item, this.getRequestOptions()).pipe(
      catchError(this.handleError)
    );
  }

  getItemByCategorySlug(categorySlug: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}items/?category_slug=${categorySlug}`).pipe(
      catchError(this.handleError)
    );
  }

  getItemByCategoryId(categoryId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}items/by-category-id/${categoryId}/`).pipe(
      catchError(this.handleError)
    );
  }

  getItemById(itemId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}items/${itemId}/`, this.getRequestOptions()).pipe(
      catchError(this.handleError)
    );
  }

  uploadProfilePicture(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('profile_picture', file);
    return this.http.post<any>(`${this.baseUrl}upload-profile-picture/`, formData).pipe(
      catchError(this.handleError)
    );
  }

  getUserProfilePicture(userId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}user-profile-picture/${userId}/`).pipe(
      catchError(this.handleError)
    );
  }

  getUserInfo(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}user-info/`, this.getRequestOptions()).pipe(
      catchError(this.handleError)
    );
  }

  getMyItems(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}items-owner/`, this.getRequestOptions()).pipe(
      catchError(this.handleError)
    );
  }
  // all messages http://localhost:8000/lendme/conversations/
  // messages between two http://localhost:8000/lendme/user-messages/?other_user_id=1 
  
  getMyChats(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}conversations/`, this.getRequestOptions()).pipe(
      catchError(this.handleError)
    );
  }
  getChat(id: any) {
    return this.http.get<any>(`${this.baseUrl}user-messages/?other_user_id=${id}`, this.getRequestOptions()).pipe(
      catchError(this.handleError)
    );
  }

  sendChatMessage(otherId: any, newMessage: any) {
    let message = {
      otherId:otherId,
      message:newMessage
    }
    return this.http.post<any>(`${this.baseUrl}send-message/`, message, this.getRequestOptions()).pipe(
      catchError(this.handleError)
    );
  }
  

}
