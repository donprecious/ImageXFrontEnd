import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { Router } from '@angular/router';
import { IGeoJson } from 'src/app/models/IImageModels';
declare var google: any;
declare var MarkerClusterer: any;
@Component({
  selector: 'app-world-map',
  templateUrl: './world-map.component.html',
  styleUrls: ['./world-map.component.css']
})
export class WorldMapComponent implements OnInit {


  constructor(private imageService: ImageService , private router: Router) { }
  imageGeoInfo: IGeoJson;
  ngOnInit(): void {
      this.imageService.getAllImageGeoInfo().subscribe(a=> {
        this.imageGeoInfo = a;
        this.renderMap();
      });

      this.renderMap();
  }
  renderMap() {

    let mapPosition = {lat: 41.2284, lng: 80.9098};
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        //  pos = {
        //   lat: position.coords.latitude,
        //   lng: position.coords.longitude
        // };
         mapPosition.lat = position.coords.latitude;
         mapPosition.lng = position.coords.longitude;
      });
    }
    let map = new google.maps.Map(
      document.getElementById('worldMap'), {zoom: 2, center: mapPosition});
    map.data.loadGeoJson(this.imageService.getImageGeoJsonUrl());
    map.data.setStyle(feature => {
      console.log('feature', feature);
      return {
        icon: {
          url: 'https://img.icons8.com/ios/50/000000/circled-dot.png',
          scaledSize: new google.maps.Size(30, 30)
        }
      };
    });

    map.data.addListener('click', event => {
  console.log(event);
  // [routerLink]="['/view', image.id]
  const id =   event.feature.getProperty('id');
  if(id){
    this.router.navigate(['/view', id]);
  }

   });
    let markers = [];
    for (const i of this.imageGeoInfo.features) {
      // tslint:disable-next-line: no-unused-expression
    let marker =  new google.maps.Marker({position: {lat: i.geometry.coordinates[1], lng: i.geometry.coordinates[0]}, map: map});

    markers.push(marker);

    marker.addListener('click', function() {
      map.setZoom(4);
      map.setCenter(marker.getPosition());
    });
     }
    const markerCluster = new MarkerClusterer(map, markers,
      {  imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
  }

}
