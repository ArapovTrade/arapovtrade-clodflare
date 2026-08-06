import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogSeventyFiveComponent } from './home-ru-blog-seventy-five/home-ru-blog-seventy-five.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  { path: '', component: HomeRuBlogSeventyFiveComponent },
];

@NgModule({
  declarations: [HomeRuBlogSeventyFiveComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class SeventyFiveRuBlogModule {}
