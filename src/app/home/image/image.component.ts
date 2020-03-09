import { ImageService } from './../../services/image.service';
import { IImageModel } from './../../models/IImageModels';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  images: IImageModel[];
  constructor(private imgService: ImageService) {

  }

  ngOnInit() {
    this.imgService.getAllImages().subscribe(a => {
        this.images = a;
        console.log("images", a);
    });
  }
}
