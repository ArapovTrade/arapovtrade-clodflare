import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogSeventyNineComponent } from './home-ru-blog-seventy-nine/home-ru-blog-seventy-nine.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  { path: '', component: HomeRuBlogSeventyNineComponent },
];

@NgModule({
  declarations: [HomeRuBlogSeventyNineComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class SeventyNineRuBlogModule {}
