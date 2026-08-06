import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogSeventyFourComponent } from './home-ru-blog-seventy-four/home-ru-blog-seventy-four.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  { path: '', component: HomeRuBlogSeventyFourComponent },
];

@NgModule({
  declarations: [HomeRuBlogSeventyFourComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class SeventyFourRuBlogModule {}
