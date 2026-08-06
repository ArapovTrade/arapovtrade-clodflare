import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogTwentySevenComponent } from './home-uk-blog-twenty-seven/home-uk-blog-twenty-seven.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  { path: '', component: HomeUkBlogTwentySevenComponent },
];

@NgModule({
  declarations: [HomeUkBlogTwentySevenComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class TwentySevenUkBlogModule {}
