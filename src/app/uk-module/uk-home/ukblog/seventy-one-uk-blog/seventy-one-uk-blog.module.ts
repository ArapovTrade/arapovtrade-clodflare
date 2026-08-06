import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogSeventyOneComponent } from './home-uk-blog-seventy-one/home-uk-blog-seventy-one.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogSeventyOneComponent }];

@NgModule({
  declarations: [HomeUkBlogSeventyOneComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class SeventyOneUkBlogModule {}
