import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogTwentyFiveComponent } from './home-ru-blog-twenty-five/home-ru-blog-twenty-five.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogTwentyFiveComponent }];

@NgModule({
  declarations: [HomeRuBlogTwentyFiveComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class TwentyFiveRuBlogModule {}
