import { ImageService } from './../../../services/image.service';
import { IImageModel } from './../../../models/IImageModels';
import { Component, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-myUploads',
  templateUrl: './myUploads.component.html',
  styleUrls: ['./myUploads.component.css']
})

export class MyUploadsComponent implements OnInit {

  constructor(private imageService: ImageService) { }
  images: IImageModel[];
  displayType = 'myupload';
  
  ngOnInit() {
    this.imageService.getMyUploads().subscribe(a=> {
      this.images = a;
    });
  }

}
