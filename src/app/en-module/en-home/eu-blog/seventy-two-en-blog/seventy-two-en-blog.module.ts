import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogSeventyTwoComponent } from './home-en-blog-seventy-two/home-en-blog-seventy-two.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogSeventyTwoComponent }];

@NgModule({
  declarations: [HomeEnBlogSeventyTwoComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class SeventyTwoEnBlogModule {}
