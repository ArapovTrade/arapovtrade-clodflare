import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogSeventySevenComponent } from './home-ru-blog-seventy-seven/home-ru-blog-seventy-seven.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  { path: '', component: HomeRuBlogSeventySevenComponent },
];

@NgModule({
  declarations: [HomeRuBlogSeventySevenComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class SeventySevenRuBlogModule {}
