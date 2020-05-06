import { Component, OnInit, Input } from '@angular/core';
import { IImageModel, IContentCollection, ILike } from 'src/app/models/IImageModels';
import { ImageService } from 'src/app/services/image.service';
import { ToastrService } from 'src/app/services/toastr.service';
declare var google: any;
declare var $: any;
declare var helpers: any;
@Component({
  selector: 'app-users-image-card',
  templateUrl: './users-image-card.component.html',
  styleUrls: ['./users-image-card.component.css']
})
export class UsersImageCardComponent implements OnInit {

  @Input() image: IImageModel;
  @Input() displayType;
  @Input() currentItem;
  profileUrl: string;
  viewsfig: any;
  contributorViews: any;

  constructor(private imageService: ImageService, private toast: ToastrService) { }



  ngOnInit(): void {
    if ( this.image.user.profileImageUrl !== null) {
      this.profileUrl = this.image.user.profileImageUrl;
    } else if ( this.image.user.firstName !== null ) {
        this.profileUrl = `https://ui-avatars.com/api/?name=${this.image.user.firstName }&rounded=true`;
    } else {
      this.profileUrl = `https://ui-avatars.com/api/?name=${this.image.user.email }&rounded=true`;
    }
    this.getContribitorsViews(this.image.user.id);
    this.getViews(this.image.id);
  }

  viewMap(id, lat, lng ) {
    const position = {lat, lng};
    const map = new google.maps.Map(document.getElementById('map_' + id), {
      center: position,
      zoom: 8
    });
    const marker = new google.maps.Marker({position, map});
  }
  edit(id) {

  }

  delete(id: number){
    this.imageService.deleteImage(id).subscribe(a=> {
      if(a.status === "success") {
          this.toast.success('item deleted');
          console.log("current element", this.currentItem);
          $("#image_div_" + id).remove();
      }
    });
  }

  getViews(id) {
    this.imageService.countViews(id).subscribe( a => {
      this.viewsfig =   helpers.convertNumsToShortWords(a);
    });

  }
  addLike(html: any, id) {
    const userId = localStorage.getItem('userId');
    const obj = {
      imageId: id,
      userId
   } as ILike;
    this.imageService.createLike(obj).subscribe(a => {
      if(a.data.liked){
        $(html).css('color', '#9e0303');
      }else{
        $(html).css('color', '#fff');
      }
   }, err => {
     console.log(err);
   });

  }

 
  getContribitorsViews(id) {
    this.imageService.countContributorViews(id).subscribe( a => {
       this.contributorViews =   helpers.convertNumsToShortWords(a);
     }
    );
 }

 addCollection(html: any, id) {
  const userId = localStorage.getItem('userId');
  const obj = {
    imageId: id,
    userId
 } as IContentCollection;
  this.imageService.createCollection(obj).subscribe(a => {
    console.log(a);
    this.toast.success('Added to collection');
    console.log(html);
    $(html).css('color', '#9e0303');

 }, err => {
   console.log(err);
 });
}

deleteFromCollection(id: number){
  this.imageService.deleteCollection(id).subscribe(a=> {
    if(a.status === "success") {
        this.toast.success('item removed from collection removed');
        $("#image_div_" + id).remove();
    }
  });
}


}
