import {HttpClient} from "@angular/common/http";
import {Inject, Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  public serviceUrl = '';

  constructor(private http: HttpClient,
              @Inject('BASE_URL') serviceUrl: string) {
    this.serviceUrl = serviceUrl;
  }
}
