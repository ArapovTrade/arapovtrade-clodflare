import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogSeventySevenComponent } from './home-en-blog-seventy-seven/home-en-blog-seventy-seven.component';
import { MatExpansionModule } from '@angular/material/expansion';

import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  { path: '', component: HomeEnBlogSeventySevenComponent },
];

@NgModule({
  declarations: [HomeEnBlogSeventySevenComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class SeventySevenEnBlogModule {}
