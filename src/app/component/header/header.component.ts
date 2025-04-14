import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { RouterModule } from "@angular/router";
import { Router } from "@angular/router";
import { MatDividerModule } from "@angular/material/divider";
@Component({
  selector: "app-header",
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    RouterModule,
  ],
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent {
  isLoggedIn = false;
  userName = "";
  userAvatar = ""; 

  constructor(private router: Router) {
    this.checkAuthStatus();
  }

  checkAuthStatus() {
    const token = localStorage.getItem("token");
    this.isLoggedIn = !!token;
    this.userName = localStorage.getItem("name") || "User";
    this.userAvatar = localStorage.getItem("avatar") || ""; 
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("avatar");
    this.router.navigate(["/login"]);
  }
}
