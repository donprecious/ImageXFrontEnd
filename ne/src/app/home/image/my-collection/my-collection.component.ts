import { ImageService } from './../../../services/image.service';
import { IImageModel } from './../../../models/IImageModels';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-collection',
  templateUrl: './my-collection.component.html',
  styleUrls: ['./my-collection.component.css']
})
export class MyCollectionComponent implements OnInit {

  constructor(private imageService: ImageService) { }
  images: IImageModel[];
  displayType = 'mycollection';
  ngOnInit() {
    this.imageService.getCollection().subscribe(a=> {
      this.images = a;
    });
  }



}
