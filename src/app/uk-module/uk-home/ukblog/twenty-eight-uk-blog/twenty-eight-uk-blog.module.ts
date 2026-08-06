import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogTwentyEightComponent } from './home-uk-blog-twenty-eight/home-uk-blog-twenty-eight.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  { path: '', component: HomeUkBlogTwentyEightComponent },
];

@NgModule({
  declarations: [HomeUkBlogTwentyEightComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class TwentyEightUkBlogModule {}
