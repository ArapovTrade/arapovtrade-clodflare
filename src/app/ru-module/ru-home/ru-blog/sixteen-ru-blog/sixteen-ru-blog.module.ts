import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogSixteenComponent } from './home-ru-blog-sixteen/home-ru-blog-sixteen.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogSixteenComponent }];

@NgModule({
  declarations: [HomeRuBlogSixteenComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class SixteenRuBlogModule {}
