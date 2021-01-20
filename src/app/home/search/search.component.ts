import { IImageModel } from "src/app/models/IImageModels";
import { ImageService } from "src/app/services/image.service";
import { Component, OnInit } from "@angular/core";
import { ICategory } from "src/app/models/CategoryModels";
import { CategoryService } from "src/app/services/category.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"],
})
export class SearchComponent implements OnInit {
  categories: ICategory[] = [];
  images: IImageModel[] = [];
  loading = false;
  isSubmited = false;
  categoryId = "";
  title = "";
  constructor(
    private categoryService: CategoryService,
    private imageService: ImageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.route.params.subscribe((params) => {
      this.categoryId = params["categoryId"];
      this.title = params["title"];
      this.getImages(this.categoryId, this.title);
    });
    this.categoryService.getAll().subscribe(
      (a) => {
        this.categories = a;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        console.error(error);
      }
    );
  }

  getImages(category = "", title = "") {
    this.isSubmited = true;
    if (category == "all") {
      category = "";
    }
    this.imageService.getAllImages(category, title).subscribe(
      (a) => {
        this.images = a;
        this.isSubmited = false;
      },
      (error) => {
        this.isSubmited = false;
        console.error(error);
      }
    );
  }
}
