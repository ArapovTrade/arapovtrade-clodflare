import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogTwentyNineComponent } from './home-uk-blog-twenty-nine/home-uk-blog-twenty-nine.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogTwentyNineComponent }];

@NgModule({
  declarations: [HomeUkBlogTwentyNineComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class TwentyNineUkBlogModule {}
