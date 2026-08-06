import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogSeventyTwoComponent } from './home-uk-blog-seventy-two/home-uk-blog-seventy-two.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogSeventyTwoComponent }];

@NgModule({
  declarations: [HomeUkBlogSeventyTwoComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class SeventyTwoUkBlogModule {}
