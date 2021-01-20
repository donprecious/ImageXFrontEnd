import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
declare var UIkit: any;
@Component({
  selector: "app-index",
  templateUrl: "./index.component.html",
  styleUrls: ["./index.component.css"],
})
export class IndexComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const showSigin = this.route.snapshot.queryParamMap.get("showSigin");
    if (showSigin === "true") {
      UIkit.modal("#modal-auth").show();
    }
  }

  search(title = "") {
    if (title) {
      this.router.navigate(["/search", { title: title }]);
    }
  }
}
