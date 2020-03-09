
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
export interface Location {
	lat: number;
	lng: number;
}

export interface Northeast {
	lat: number;
	lng: number;
}

export interface Southwest {
	lat: number;
	lng: number;
}

export interface Viewport {
	northeast: Northeast;
	southwest: Southwest;
}

export interface Geometry {
	location: Location;
	viewport: Viewport;
}

export interface Opening_hour {
	open_now: boolean;
	weekday_text: any[];
}

export interface Photo {
	height: number;
	html_attributions: string[];
	photo_reference: string;
	width: number;
}

export interface Candidate {
	formatted_address: string;
	geometry: Geometry;
	name: string;
	opening_hours: Opening_hour;
	photos: Photo[];
	rating: number;
}

export interface Debug_log {
	line: any[];
}

export interface IPlaceSeachResponse {
	candidates: Candidate[];
	debug_log: Debug_log;
	status: string;
}
@Injectable({
  providedIn: 'root'
})
export class GooglePlaceService {

constructor(private http: HttpClient) { }

 proxyurl = "https://cors-anywhere.herokuapp.com/";

apiKey: 'AIzaSyDyXDcpICpy-AnVTTwEj6Qiywon3SMqy7w';
httpOptions = {
  headers: new HttpHeaders({
    Origin: location.origin,
    'Access-Control-Allow-Origin': location.origin
  })
};
getSearchPlace(place: string): Observable<IPlaceSeachResponse> {
  // tslint:disable-next-line: max-line-length
  const url =this.proxyurl+  `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${place}&inputtype=textquery&fields=formatted_address,name,geometry&key=AIzaSyDyXDcpICpy-AnVTTwEj6Qiywon3SMqy7w`;
  return this.http.get<IPlaceSeachResponse>(url);
}

}
