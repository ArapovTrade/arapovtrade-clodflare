import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogSeventyFiveComponent } from './home-en-blog-seventy-five/home-en-blog-seventy-five.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  { path: '', component: HomeEnBlogSeventyFiveComponent },
];

@NgModule({
  declarations: [HomeEnBlogSeventyFiveComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class SeventyFiveEnBlogModule {}
