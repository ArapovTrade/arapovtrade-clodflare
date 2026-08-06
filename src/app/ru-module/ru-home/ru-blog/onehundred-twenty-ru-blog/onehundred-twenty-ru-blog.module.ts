import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredTwentyComponent } from './home-ru-blog-onehundred-twenty/home-ru-blog-onehundred-twenty.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredTwentyComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredTwentyComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredTwentyRuBlogModule { }
