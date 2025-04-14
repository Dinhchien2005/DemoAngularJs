import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private apiUrl = "https://reqres.in/api/users";

  constructor(private http: HttpClient) {}

  // Lấy danh sách người dùng
  getUsers(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  // Thêm người dùng mới
  addUser(newUser: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, newUser);
  }

  // Cập nhật thông tin người dùng
  updateUser(updatedUser: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${updatedUser.id}`, updatedUser);
  }

  // Xóa người dùng
  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
