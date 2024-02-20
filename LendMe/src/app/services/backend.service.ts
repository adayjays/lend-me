import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

}
