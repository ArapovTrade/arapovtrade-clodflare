import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogSixteenComponent } from './home-uk-blog-sixteen/home-uk-blog-sixteen.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogSixteenComponent }];

@NgModule({
  declarations: [HomeUkBlogSixteenComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class SixteenUkBlogModule {}
