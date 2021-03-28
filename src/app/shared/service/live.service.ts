import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { ResponsePageableModel } from '../model/responsePageable.model';
import {Lives} from '../model/live.model';

@Injectable({
  providedIn: 'root'
})
export class LiveService {


  private apiUrl = 'http://localhost:3000/lives';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  public getLivesWithFlag(flag: string): Observable<ResponsePageableModel> {
    return this.httpClient.get<ResponsePageableModel>(`${this.apiUrl}/?flag=${flag}`);
  }

  public postLives(live: any): Observable<Lives> {
    return this.httpClient.post<any>(this.apiUrl, live, this.httpOptions);
  }
}
