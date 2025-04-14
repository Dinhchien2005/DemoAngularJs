import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms"; 
@Component({
  selector: "app-user-form-modal",
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule, 
  ],
  templateUrl: "./user-form-modal.component.html",
  styleUrls: ["./user-form-modal.component.css"],
})
export class UserFormModalComponent {
  newUser = { name: "", email: "" };

  constructor(
    public dialogRef: MatDialogRef<UserFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data?.selectedUser) {
      this.newUser = { ...data.selectedUser };
    }
  }

  addUser() {
    this.dialogRef.close({ action: "add", user: this.newUser });
  }

  updateUser() {
    this.dialogRef.close({ action: "update", user: this.newUser });
  }

  cancelEdit() {
    this.dialogRef.close();
  }
}
