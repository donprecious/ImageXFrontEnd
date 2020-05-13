import { Injectable } from '@angular/core';
declare var toastr: any;
@Injectable({
  providedIn: 'root'
})
export class ToastrService {

 public toastOptions =  {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-bottom-full-width",
    "preventDuplicates": true,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "3000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  };
constructor() {

  toastr.options = this.toastOptions;

 }

success(message: string, title = '') {
  
  toastr.success(message, title);
}
info(message: string, title = '') {
  toastr.info(message, title);
}
error(message: string, title = '') {
  toastr.error(message, title);
}
warining(message: string, title = '') {
  toastr.warning(message, title);
}
}
