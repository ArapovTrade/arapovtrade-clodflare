import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogTwoComponent } from './home-en-blog-two/home-en-blog-two.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogTwoComponent }];

@NgModule({
  declarations: [HomeEnBlogTwoComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class TwoEnBlogModule {}
