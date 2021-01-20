import { AuthGuard } from "./../auth/auth.guard";
import { WorldMapComponent } from "./world-map/world-map.component";
import { MyCollectionComponent } from "./image/my-collection/my-collection.component";
import { ViewImageComponent } from "./image/view-image/view-image.component";
import { AfricaMapComponent } from "./africa-map/africa-map.component";
import { MyUploadsComponent } from "./image/myUploads/myUploads.component";
import { UploadFileComponent } from "./upload-file/upload-file.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { IndexComponent } from "./index/index.component";
import { SiteLayoutComponent } from "./../layout/site-layout/site-layout.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SearchComponent } from "./search/search.component";

const routes: Routes = [
  {
    path: "",
    component: SiteLayoutComponent,
    children: [
      { path: "", component: IndexComponent },
      { path: "home", component: IndexComponent },
      { path: "home", component: IndexComponent },

      { path: "index", component: IndexComponent },
      { path: "view/:id", component: ViewImageComponent },
      {
        path: "upload",
        component: UploadFileComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "myuploads",
        component: MyUploadsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "mycollection",
        component: MyCollectionComponent,
        canActivate: [AuthGuard],
      },
      { path: "africa-map", component: AfricaMapComponent },
      { path: "world-map", component: WorldMapComponent },
      { path: "search", component: SearchComponent },
      { path: "**", component: PageNotFoundComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
