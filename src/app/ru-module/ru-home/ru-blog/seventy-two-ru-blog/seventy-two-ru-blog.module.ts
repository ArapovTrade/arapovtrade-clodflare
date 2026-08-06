import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogSeventyTwoComponent } from './home-ru-blog-seventy-two/home-ru-blog-seventy-two.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogSeventyTwoComponent }];

@NgModule({
  declarations: [HomeRuBlogSeventyTwoComponent],
  imports: [CommonModule, MatExpansionModule, RouterModule.forChild(routes)],
})
export class SeventyTwoRuBlogModule {}
