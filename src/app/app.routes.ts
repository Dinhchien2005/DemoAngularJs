import { Routes } from "@angular/router";
import { authGuard } from "./auth/auth.guard";

export const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  {
    path: "login",
    loadComponent: () =>
      import("./auth/login/login.component").then((m) => m.LoginComponent),
  },
  {
    path: "register",
    loadComponent: () =>
      import("./auth/register/register.component").then(
        (m) => m.RegisterComponent
      ),
  },
  {
    path: "users",
    loadComponent: () =>
      import("./component/user-manager/user-manager.component").then(
        (m) => m.UserManagerComponent
      ),
    canActivate: [authGuard],
  },
];
