import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogThirteenComponent } from './home-en-blog-thirteen/home-en-blog-thirteen.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogThirteenComponent }];

@NgModule({
  declarations: [HomeEnBlogThirteenComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class ThirteenEnBlogModule {}
