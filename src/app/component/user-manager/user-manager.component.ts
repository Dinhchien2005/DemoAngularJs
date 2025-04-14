import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { UserFormModalComponent } from "../user-form-modal/user-form-modal.component";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { CommonModule } from "@angular/common";
import { UserService } from "../../services/user.service";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "app-user-manager",
  standalone: true,
  templateUrl: "./user-manager.component.html",
  styleUrls: ["./user-manager.component.css"],
  imports: [
    CommonModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    UserFormModalComponent,
  ],
})
export class UserManagerComponent implements OnInit {
  users: any[] = [];
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ["name", "email", "actions"];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private userService: UserService,
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
    this.userService.getUsers().subscribe((res) => {
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

    this.userService.addUser(newUser).subscribe(() => {
      this.showNotification("Added successfully");

      const fakeId = Math.floor(Math.random() * 10000);
      const addedUser = { id: fakeId, ...newUser };

      this.dataSource.data = [...this.dataSource.data, addedUser];
    });
  }

  updateUser(updatedUser: any) {
    if (!updatedUser) return;

    this.userService.updateUser(updatedUser).subscribe(() => {
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
    this.userService.deleteUser(id).subscribe(() => {
      this.showNotification("Deleted successfully");

      this.dataSource.data = this.dataSource.data.filter(
        (user: any) => user.id !== id
      );
    });
  }
}
