import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogSeventyFourComponent } from './home-uk-blog-seventy-four/home-uk-blog-seventy-four.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  { path: '', component: HomeUkBlogSeventyFourComponent },
];

@NgModule({
  declarations: [HomeUkBlogSeventyFourComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class SeventyFourUkBlogModule {}
