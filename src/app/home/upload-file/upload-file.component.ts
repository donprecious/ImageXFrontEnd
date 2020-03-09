import { ToastrService } from './../../services/toastr.service';
import { ImageService } from './../../services/image.service';
import { ICreateImageModel } from './../../models/IImageModels';
import { TagService } from './../../services/tag.service';
import { IPlaceSeachResponse } from './../../services/google-place.service';
import { CategoryService } from './../../services/category.service';
import { ICategory } from './../../models/CategoryModels';
import { ApiAppUrlService } from './../../services/api-app-url.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
declare var Uppy: any;
declare var google: any;



@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {

 uploadedImage = [];
 categories: ICategory[];
 place: IPlaceSeachResponse;
tags = [];
  constructor(private api: ApiAppUrlService, private categoryService: CategoryService,
              private tagService: TagService, private imageService: ImageService,
              private router: Router,
              private  toast: ToastrService
              ) { }
 uppy: any;
ngOnInit(): void {

           this.uppy = Uppy.Core()
          .use(Uppy.Dashboard, {
            inline: true,
            target: '#upload'
          })
          .use(Uppy.XHRUpload,  {endpoint: `${this.api.baseApiUrl}image/UploadFiles`})
          .use(Uppy.Webcam, {
            target: Uppy.Dashboard,
            mode: ['video-audio', 'picture'],
            mirror: true
            });
           // .use(Uppy.Facebook, { target: Uppy.Dashboard, companionUrl: 'https://companion.uppy.io' });

           this.uppy.on('complete', (result) => {
                console.log('Upload complete! We’ve uploaded these files:', result.successful);
                });

                    // initialize category
           this.categoryService.getAll().subscribe(a => {
                      this.categories = a;
                      console.log('categories recieved', a);
                    });
           this.tagService.getAll().subscribe( a => {
                      for (const i of a) {
                       this.tags.push(i.name);
                      }
                      console.log("tags Recieved", a);
                    });
  }
  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit() {
    this.uppy.on('upload-success', (file, response) => {
      console.log('response ', response);
      console.log('response file', file);
      const url = response.uploadURL;
      const obj = {
        id : this.uploadedImage.length + 1 ,
        image:  url,
        title: '',
        tagIds: [],
        categoryId: '',
        address: '',
        lat : '',
        lng: ''
      };

      this.uploadedImage.push(obj);


      setTimeout(()=>{ this.initAutoCompete(obj.id);} , 5000);
      console.log(this.uploadedImage);
          });

}
  inputChange(event: any) {
    console.log('input changes', event, 'uploaded Images', this.uploadedImage);
  }

  searchPlace() {


  }

  initAutoCompete(id) {

    const autocomplete = new google.maps.places.Autocomplete(document.getElementById('search_' + id), {types: ['geocode']});
    autocomplete.setFields(['formatted_address', 'name', 'geometry']);
    autocomplete.addListener('place_changed', () => {
     const place = autocomplete.getPlace();
     console.log('places found', place);
     console.log('co-ordinate', place.geometry.location.lat(), place.geometry.location.lng());
     for (const i of this.uploadedImage) {
            if (i.id == id) {
              i.address = place.formatted_address;
              i.lat = parseFloat(place.geometry.location.lat()).toFixed(2);
              i.lng = parseFloat(place.geometry.location.lng()).toFixed(2);
              break;
            }
        }
     console.log('uploaded image data', this.uploadedImage);
    });
  }

  submitForm(myForm: NgForm) {

      console.log("form is submited", myForm);
      console.log('form State ', myForm.valid);
      if (myForm.valid) {
        let images: ICreateImageModel[] = [];
        for(const i of this.uploadedImage){
          const image = {
            userId: localStorage.getItem('userId'),
            categoryId: i.categoryId,
            name: i.title,
            description: '',
            geoLat: i.lat,
            geoLog: i.lng,
            location: i.address,
            imageUrl: i.image,
            tag: i.tagIds,
          } as ICreateImageModel;
          images.push(image);
        }
        this.imageService.create(images).subscribe(a => {
            console.log(a);
            // show a notification
            this.toast.success('Content Published Successfully');
            // redirect to uploaded images
            this.router.navigate(['/myuploads']);
        });
      }
  }


}
