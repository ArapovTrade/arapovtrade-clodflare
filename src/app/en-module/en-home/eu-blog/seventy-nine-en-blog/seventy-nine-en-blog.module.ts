import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogSeventyNineComponent } from './home-en-blog-seventy-nine/home-en-blog-seventy-nine.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  { path: '', component: HomeEnBlogSeventyNineComponent },
];

@NgModule({
  declarations: [HomeEnBlogSeventyNineComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class SeventyNineEnBlogModule {}
