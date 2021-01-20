import { CategoryService } from "./../../services/category.service";
import { Router } from "@angular/router";
import { AuthService } from "./../../services/auth.service";
import { Observable } from "rxjs";

import { Component, OnInit } from "@angular/core";
import { ICategory } from "src/app/models/CategoryModels";

@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.css"],
})
export class NavBarComponent implements OnInit {
  isSignedIn = false;
  isSignedIn$: Observable<boolean>;
  profileImageurl: string;
  categories: ICategory[] = [];
  constructor(
    private authService: AuthService,
    private router: Router,
    private categoryService: CategoryService
  ) {
    var userData = this.authService.GetSignInData();
    if (userData != null || userData != undefined) {
      if (
        userData.user.profileImageUrl != "" ||
        userData.user.profileImageUrl != null
      ) {
        this.profileImageurl = userData.user.profileImageUrl;
      } else {
        if (userData.user.firstName != "" || userData.user.firstName != null) {
          // tslint:disable-next-line: max-line-length
          this.profileImageurl = `https://ui-avatars.com/api/?name=${
            userData.user.firstName + " " + userData.user.lastName
          }&rounded=true`;
        } else {
          this.profileImageurl = `https://ui-avatars.com/api/?name=${userData.user.email}&rounded=true`;
        }
      }
    }
    this.categoryService.getAll().subscribe((a) => {
      this.categories = a;
    });
  }

  ngOnInit(): void {
    // this.isSignedIn$ = this.store.pipe(select('isSignedIn'));

    this.isSignedIn$ = this.authService.isLogin;
    console.log("is logged in object", this.isSignedIn$);
    console.log(this.isSignedIn);
  }

  logout() {
    this.authService.Logout();
    this.router.navigate(["/"]);
  }
}
