import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogSeventySevenComponent } from './home-uk-blog-seventy-seven/home-uk-blog-seventy-seven.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  { path: '', component: HomeUkBlogSeventySevenComponent },
];

@NgModule({
  declarations: [HomeUkBlogSeventySevenComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class SeventySevenUkBlogModule {}
