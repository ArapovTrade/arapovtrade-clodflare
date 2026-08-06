import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogSeventyNineComponent } from './home-uk-blog-seventy-nine/home-uk-blog-seventy-nine.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  { path: '', component: HomeUkBlogSeventyNineComponent },
];

@NgModule({
  declarations: [HomeUkBlogSeventyNineComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class SeventyNineUkBlogModule {}
