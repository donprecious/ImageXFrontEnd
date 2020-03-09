import { IImageModel } from './../../../models/IImageModels';
import { ImageService } from './../../../services/image.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css']
})
export class ImageListComponent implements OnInit {
  @Input() images: IImageModel[];

  constructor() {

   }


  ngOnInit(): void {

  }

}
