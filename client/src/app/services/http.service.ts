import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private socket$: WebSocketSubject<any>
  constructor(private http: HttpClient) {
    this.socket$ =new  WebSocketSubject('ws://localhost:3000/api/fetchProject')
  }

  serviceCall(url: string, request: any) {
    return this.http.post(url, request);
  }

  getUpdate(){
    return this.socket$.asObservable();
  }
}
