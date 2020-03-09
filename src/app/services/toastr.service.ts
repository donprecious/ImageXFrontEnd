import { Injectable } from '@angular/core';
declare var toastr: any;
@Injectable({
  providedIn: 'root'
})
export class ToastrService {

constructor() {

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
