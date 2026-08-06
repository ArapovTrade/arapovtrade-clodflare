import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogTenComponent } from './home-en-blog-ten/home-en-blog-ten.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogTenComponent }];

@NgModule({
  declarations: [HomeEnBlogTenComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],

})
export class TenEnBlogModule {}
