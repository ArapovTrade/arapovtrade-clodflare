import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogTwentyNineComponent } from './home-ru-blog-twenty-nine/home-ru-blog-twenty-nine.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogTwentyNineComponent }];

@NgModule({
  declarations: [HomeRuBlogTwentyNineComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class TwentyNineRuBlogModule {}
