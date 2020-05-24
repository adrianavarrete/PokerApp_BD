import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  readonly URL = 'http://localhost:9000/api';

  modelo2cartas(s1, c1, s2, c2) {

    return this.http.get(this.URL + '/modelo2cartas/' + s1 + '/' + c1 + '/' + s2 + '/' + c2);

  }

  modelo3cartas(s1, c1, s2, c2, s3, c3) {

    return this.http.get(this.URL + '/modelo3cartas/' + s1 + '/' + c1 + '/' + s2 + '/' + c2 + '/' + s3 + '/' + c3);

  }

  modelo4cartas(s1, c1, s2, c2, s3, c3, s4, c4) {

    return this.http.get(this.URL + '/modelo4cartas/' + s1 + '/' + c1 + '/' + s2 + '/' + c2 + '/' + s3 + '/' + c3 + '/' + s4 + '/' + c4);

  }


}
