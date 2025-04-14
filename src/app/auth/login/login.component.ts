import { Component } from "@angular/core";
import { AuthService } from "../auth.service";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";

@Component({
  selector: "app-login",
  standalone: true,
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
  imports: [FormsModule, CommonModule, MatSnackBarModule],
})
export class LoginComponent {
  user = { email: "", password: "" };
  message = "";

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}
  showNotification(message: string) {
    this.snackBar.open(message, "Đóng", {
      duration: 3000,
      verticalPosition: "top",
      horizontalPosition: "right",
    });
  }
  login() {
    this.authService.login(this.user).subscribe({
      next: (res) => {
        localStorage.setItem("token", res.token);

        this.authService.getUsers().subscribe({
          next: (userRes) => {
            const matchedUser = userRes.data.find(
              (u: any) => u.email === this.user.email
            );

            if (matchedUser) {
              const fullName =
                matchedUser.first_name + " " + matchedUser.last_name;
              localStorage.setItem("name", fullName);

              localStorage.setItem("avatar", matchedUser.avatar);
            } else {
              localStorage.setItem("name", "Unknown User");
              localStorage.setItem("avatar", "");
            }

            this.router.navigate(["/users"]).then(() => {
              window.location.reload();
            });

            this.showNotification("Login successful!");
          },
          error: () => {
            this.showNotification("Failed to fetch user info");
          },
        });
      },
      error: () => {
        this.showNotification("Login failed!");
      },
    });
  }
}
