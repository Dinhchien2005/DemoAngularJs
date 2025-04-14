// src/app/auth/register/register.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class RegisterComponent {
  user = {
    email: '',
    password: '',
    confirmPassword: '',
  };

  message = '';

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}
  showNotification(message: string) {
    this.snackBar.open(message, 'Đóng', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }
  register() {
    if (this.user.password !== this.user.confirmPassword) {
      this.message = 'Mật khẩu xác nhận không khớp!';
      return;
    }

    this.authService
      .register({
        email: this.user.email,
        password: this.user.password,
      })
      .subscribe({
        next: (res) => {
          this.showNotification('Đăng ký thành công!');
          this.router.navigate(['/login']);
          console.log('Token:', res.token);
        },
        error: (err) => {
          this.showNotification('Đăng ký thất bại.');
        },
      });
  }
}
