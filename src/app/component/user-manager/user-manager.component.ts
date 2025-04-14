import { Component, OnInit, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { UserFormModalComponent } from "../user-form-modal/user-form-modal.component";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";

@Component({
  selector: "app-user-manager",
  standalone: true,
  templateUrl: "./user-manager.component.html",
  styleUrls: ["./user-manager.component.css"],
  imports: [
    CommonModule,
    HttpClientModule,
    MatIconModule,
    MatSnackBarModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
  ],
})
export class UserManagerComponent implements OnInit {
  users: any[] = [];
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ["name", "email", "actions"];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  showNotification(message: string) {
    this.snackBar.open(message, "Close", {
      duration: 3000,
      verticalPosition: "top",
      horizontalPosition: "right",
    });
  }

  ngOnInit() {
    this.loadUsers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadUsers() {
    this.http.get<any>("https://reqres.in/api/users").subscribe((res) => {
      this.users = res.data.map((user: any) => ({
        id: user.id,
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
      }));
      this.dataSource.data = [...this.users];
    });
  }

  openUserForm(selectedUser: any = null) {
    const dialogRef = this.dialog.open(UserFormModalComponent, {
      width: "700px",
      height: "300px",
      data: { selectedUser },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.action === "add") {
          this.addUser(result.user);
        } else if (result.action === "update") {
          this.updateUser(result.user);
        }
      }
    });
  }

  addUser(newUser: any) {
    if (!newUser.name || !newUser.email) return;

    this.http
      .post<any>("https://reqres.in/api/users", newUser)
      .subscribe(() => {
        this.showNotification("Added successfully");

        const fakeId = Math.floor(Math.random() * 10000);
        const addedUser = { id: fakeId, ...newUser };

        this.dataSource.data = [...this.dataSource.data, addedUser];
      });
  }

  updateUser(updatedUser: any) {
    if (!updatedUser) return;

    this.http
      .put(`https://reqres.in/api/users/${updatedUser.id}`, updatedUser)
      .subscribe(() => {
        this.showNotification("Updated successfully");

        const index = this.dataSource.data.findIndex(
          (user: any) => user.id === updatedUser.id
        );
        if (index !== -1) {
          this.dataSource.data[index] = { ...updatedUser };
          this.dataSource.data = [...this.dataSource.data];
        }
      });
  }

  deleteUser(id: number) {
    this.http.delete(`https://reqres.in/api/users/${id}`).subscribe(() => {
      this.showNotification("Deleted successfully");

      this.dataSource.data = this.dataSource.data.filter(
        (user: any) => user.id !== id
      );
    });
  }
}
