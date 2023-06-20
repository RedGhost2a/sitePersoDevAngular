import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ContactFormComponent} from "./contact-form/contact-form.component";
import {BlogComponent} from "./blog/blog.component";
import {AdminComponent} from "./admin/admin.component";

const routes: Routes = [
  { path: 'contact', component: ContactFormComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'admin', component: AdminComponent },
  { path: '', redirectTo: '/blog', pathMatch: 'full' },
  // { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
