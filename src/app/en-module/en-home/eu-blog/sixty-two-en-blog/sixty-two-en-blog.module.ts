import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogSixtyTwoComponent } from './home-en-blog-sixty-two/home-en-blog-sixty-two.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  { path: '', component: HomeEnBlogSixtyTwoComponent },
];

@NgModule({
  declarations: [HomeEnBlogSixtyTwoComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class SixtyTwoEnBlogModule {}
