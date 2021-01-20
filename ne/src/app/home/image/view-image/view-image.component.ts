import { ImageService } from './../../../services/image.service';
import { IImage, IImageModel, IContentCollection, ILike } from './../../../models/IImageModels';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ToastrService } from 'src/app/services/toastr.service';
declare var $: any;
declare var helpers: any;


@Component({
  selector: 'app-view-image',
  templateUrl: './view-image.component.html',
  styleUrls: ['./view-image.component.css']
})
export class ViewImageComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private imageService: ImageService,
    private toast: ToastrService
  ) {
   }

  image: IImageModel = null;

  likesfig='';


  viewsfig = '';
 contributorViews = '';
  profileUrl: string;

  ngOnInit(): void {

    // this.route.paramMap.pipe(
    // this.image$ =   switchMap((params: ParamMap) => {
    //     const id =  params.get('id');
    //     return this.imageService.get(id);
    //   })
    // );

    this.route.paramMap.subscribe(a => {
          const id =  a.get('id');
          console.log('params, ' , a);
          console.log('id, ' ,id);
          this.imageService.get(id).subscribe(img => {
              console.log("image recieved", img);
            this.image = img;
            if ( this.image.user.profileImageUrl !== null) {
              this.profileUrl = this.image.user.profileImageUrl;
            } else if ( this.image.user.firstName !== null ) {
                this.profileUrl = `https://ui-avatars.com/api/?name=${this.image.user.firstName }&rounded=true`;
            } else {
              this.profileUrl = `https://ui-avatars.com/api/?name=${this.image.user.email }&rounded=true`;

            }

            this.getLikes(id);
            this.getViews(id);
            this.getContribitorsViews(id);





          });
    });



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
addLike(html: any, id) {
    const userId = localStorage.getItem('userId');
    const obj = {
      imageId: id,
      userId
    } as ILike;
    this.imageService.createLike(obj).subscribe(a => {
      console.log(a);
      // this.toast.success('Added to collection');
      console.log(html);
      if(a.data.liked){
        $(html).css('color', '#9e0303');
      }else{
        $(html).css('color', '#fff');
      }
      this.getLikes(id);

    }, err => {
    console.log(err);
    });
 }

    getLikes(id) {
        this.imageService.countLiks(id).subscribe( a=> {
          this.likesfig =   helpers.convertNumsToShortWords(a);

        });
    }

    getViews(id) {
      this.imageService.countViews(id).subscribe( a => {
        this.viewsfig =   helpers.convertNumsToShortWords(a);

      });
    }

    getContribitorsViews(id) {
      this.imageService.countContributorViews(id).subscribe( a=> {
        this.contributorViews =   helpers.convertNumsToShortWords(a);

      });
   }


}
