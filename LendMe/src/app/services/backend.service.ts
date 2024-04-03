import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, interval, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
    
  // private baseUrl = 'http://127.0.0.1:8000/lendme/';
  private baseUrl = 'https://lend-me.onrender.com/lendme/';
  // http://127.0.0.1:8000
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
    return this.http.get<any[]>(`${this.baseUrl}item/by-category-slug?category_slug=${categorySlug}`).pipe(
      catchError(this.handleError)
    );
  }

  getItemByCategoryId(categoryId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}item/by-category-id/${categoryId}/`).pipe(
      catchError(this.handleError)
    );
  }

  getItemById(itemId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}item/${itemId}/`, this.getRequestOptions()).pipe(
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

  fetchMessagesPeriodically(otherId: number): Observable<any> {
    // Fetch messages every 2 seconds
    return interval(2000).pipe(
      switchMap(() => this.getChat(otherId))
    );
  }

  getMyNotifications(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}notifications/`, this.getRequestOptions()).pipe(
      catchError(this.handleError)
    );
  }
  
  getNotification(id: any) {
    return this.http.get<any>(`${this.baseUrl}notifications/${id}/`, this.getRequestOptions()).pipe(
      catchError(this.handleError)
    );
  }
  
  borrowItem(detail:any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}borrow/`,detail, this.getRequestOptions()).pipe(
      catchError(this.handleError)
    );
  }

  acceptRequest(id:any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}accept-borrow-request/${id}/`,{}, this.getRequestOptions()).pipe(
      catchError(this.handleError)
    );
  }

  getRequests(id: any) {
    return this.http.get<any>(`${this.baseUrl}item-requests/?item_id=${id}`, this.getRequestOptions()).pipe(
      catchError(this.handleError)
    );
  }
  
  denyRequest(id:any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}deny-item-request/${id}/`,{}, this.getRequestOptions()).pipe(
      catchError(this.handleError)
    );
  }

  searchItems(query: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}items-search/?query=${query}`).pipe(
      catchError(this.handleError)
    );
  }

  getLatest(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}items/`, this.getRequestOptions()).pipe(
      catchError(this.handleError)
    );
  }
  loadNextPage(nextPageUrl: string): Observable<any> {
    return this.http.get<any>(nextPageUrl).pipe(
      catchError(this.handleError)
    );
  }

  getRecommendedItems(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}recommended-items/`).pipe(
      catchError(this.handleError)
    );
  }

}
