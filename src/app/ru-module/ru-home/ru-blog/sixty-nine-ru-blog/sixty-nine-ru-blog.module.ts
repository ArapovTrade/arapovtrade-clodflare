import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogSixtyNineComponent } from './home-ru-blog-sixty-nine/home-ru-blog-sixty-nine.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogSixtyNineComponent }];

@NgModule({
  declarations: [HomeRuBlogSixtyNineComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class SixtyNineRuBlogModule {}
