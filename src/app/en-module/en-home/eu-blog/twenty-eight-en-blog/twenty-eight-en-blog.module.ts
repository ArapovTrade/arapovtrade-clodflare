import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogTwentyEightComponent } from './home-en-blog-twenty-eight/home-en-blog-twenty-eight.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  { path: '', component: HomeEnBlogTwentyEightComponent },
];

@NgModule({
  declarations: [HomeEnBlogTwentyEightComponent],
 imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class TwentyEightEnBlogModule {}
