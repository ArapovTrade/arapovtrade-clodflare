import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogSixtyNineComponent } from './home-en-blog-sixty-nine/home-en-blog-sixty-nine.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogSixtyNineComponent }];

@NgModule({
  declarations: [HomeEnBlogSixtyNineComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class SixtyNineEnBlogModule {}
