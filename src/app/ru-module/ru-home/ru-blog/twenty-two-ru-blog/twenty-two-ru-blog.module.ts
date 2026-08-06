import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogTwentyTwoComponent } from './home-ru-blog-twenty-two/home-ru-blog-twenty-two.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogTwentyTwoComponent }];

@NgModule({
  declarations: [HomeRuBlogTwentyTwoComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class TwentyTwoRuBlogModule {}
