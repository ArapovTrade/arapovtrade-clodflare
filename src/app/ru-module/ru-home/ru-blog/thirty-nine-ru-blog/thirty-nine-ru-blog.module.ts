import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogThirtyNineComponent } from './home-ru-blog-thirty-nine/home-ru-blog-thirty-nine.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogThirtyNineComponent }];

@NgModule({
  declarations: [HomeRuBlogThirtyNineComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class ThirtyNineRuBlogModule {}
