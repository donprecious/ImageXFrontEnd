import { ToastrService } from './../../services/toastr.service';
import { ImageService } from './../../services/image.service';
import { ICreateImageModel, FileInfoModel, CreateColorModel } from './../../models/IImageModels';
import { TagService } from './../../services/tag.service';
import { IPlaceSeachResponse } from './../../services/google-place.service';
import { CategoryService } from './../../services/category.service';
import { ICategory } from './../../models/CategoryModels';
import { ApiAppUrlService } from './../../services/api-app-url.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';
import { NgxUiLoaderService } from 'ngx-ui-loader';

declare var Vibrant: any;
declare var Uppy: any;
declare var google: any;
declare var loadImage: any;

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {

 uploadedImage = [];
 categories: ICategory[];
 place: IPlaceSeachResponse;
 hasUploaded = false;
tags = [];
  constructor(private api: ApiAppUrlService, private categoryService: CategoryService,
              private tagService: TagService, private imageService: ImageService,
              private router: Router,
              private  toast: ToastrService,
              private ngxService: NgxUiLoaderService
              ) { }
 uppy: any;
ngOnInit(): void {

           this.uppy = Uppy.Core()
          .use(Uppy.Dashboard, {
            inline: true,
            target: '#upload',
            width: '100%'
          })
          .use(Uppy.XHRUpload,  {endpoint: `${this.api.baseApiUrl}image/UploadFiles`})
          .use(Uppy.Webcam, {
            target: Uppy.Dashboard,
            mode: ['video-audio', 'picture'],
            mirror: true
            });

                    // initialize category
           this.categoryService.getAll().subscribe(a => {
                      this.categories = a;
                    });
           this.tagService.getAll().subscribe( a => {
                      for (const i of a) {
                       this.tags.push(i.name);
                      }

                    });

                  // listen if uploadedFiles has been removed
           if (this.uploadedImage.length <= 0) {
                    this.hasUploaded = false ;
                  }
  }
  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit() {
    this.uppy.on('upload-success', (file, response) => {
      console.log('response ', response);
      console.log('response file', file);
      const fileType = file.data.type.split('/')[0].toLowerCase();
      const fileSize = (file.data.size / (1024 * 1024)).toFixed(2);
      const url = response.uploadURL;
      const obj = {
        id : this.uploadedImage.length + 1 ,
        image:  url,
        title: '',
        categoryId: '',
        address: '',
        lat : '',
        lng: '',
        fileType,
        fileInfo: {
          artist: 'n/a',
          duration: 'n/a',
          fileSize: fileSize + ' mb',
          genre: 'n/a',
          height: 'n/a',
          model: 'n/a',
          software: 'n/a',
          width: 'n/a',
        } as FileInfoModel,
        colors: [] as CreateColorModel[]
      };
      // show loader
      this.ngxService.startLoader('loader-01');
      if (fileType=== "image"){
        loadImage(
          'https://cors-anywhere.herokuapp.com/' +  url,
           (img, data) => {
            if (img.type === 'error') {
              console.error('Error loading image ' + url);
            } else {
              console.log('Loaded image data: ', data);

              obj.fileInfo.height = data.originalHeight;
              obj.fileInfo.width = data.originalWidth;
              if (data.exif != undefined) {
                const allTags = data.exif.getAll();
                console.log('Loaded image exif tag data: ', allTags);
                obj.fileInfo.model =allTags.Make + ' / ' + allTags.Model;
                obj.fileInfo.software = allTags.Software;
              }

              // get color palate
              Vibrant.from('https://cors-anywhere.herokuapp.com/' + url).getPalette()
              .then((palette) => {
                console.log( "vibrant palater", palette);
                obj.colors.push( {code: palette.LightVibrant.hex, level: 'LightVibrant' }as CreateColorModel);
                obj.colors.push( {code: palette.Vibrant.hex , level: 'Vibrant' }as CreateColorModel);
                obj.colors.push( {code: palette.LightMuted.hex, level: 'LightMuted'}as CreateColorModel);
                obj.colors.push( {code: palette.DarkMuted.hex, level: 'DarkMuted' }as CreateColorModel);
                obj.colors.push( {code: palette.DarkVibrant.hex, level: 'DarkVibrant' }as CreateColorModel);
                obj.colors.push( {code: palette.Muted.hex, level: 'Muted' }as CreateColorModel);


                this.uploadedImage.push(obj);
                this.hasUploaded = true;

                setTimeout(() => { this.initAutoCompete(obj.id); } , 5000);
             
                this.ngxService.stopLoader('loader-01');

              }).
              catch(err=> {
                console.log('vibrant error ', err);
                this.ngxService.stopLoader('loader-01');

              });


            }
          } , { meta: true , canvas: true, }
        );
      } else
      if (fileType === 'video'){
        let video = document.createElement("video");
        video.src = url;
        setTimeout(() => {
          obj.fileInfo.duration = (video.duration / 60) .toString() + 'min(s)';
          obj.fileInfo.width = video.videoWidth.toString();
          obj.fileInfo.height = video.videoHeight.toString();
          this.uploadedImage.push(obj);
          this.hasUploaded = true;

          setTimeout(() => { this.initAutoCompete(obj.id); } , 5000);
          console.log("ready  files for submit", this.uploadedImage);
          this.ngxService.stopLoader('loader-01');
        }, 3000);
      }
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

      console.log('form is submited', myForm);
      console.log('form State ', myForm.valid);
      if (myForm.valid) {
        const images: ICreateImageModel[] = [];
        for (const i of this.uploadedImage) {
          const image = {
            userId: localStorage.getItem('userId'),
            categoryId: i.categoryId,
            name: i.title,
            description: '',
            geoLat: i.lat,
            geoLog: i.lng,
            location: i.address,
            imageUrl: i.image,
            tag: i.tags,
            fileType: i.fileType,
            fileInfo: i.fileInfo,
            colors: i.colors

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
