import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredEightyfourComponent } from './home-uk-blog-onehundred-eightyfour/home-uk-blog-onehundred-eightyfour.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredEightyfourComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredEightyfourComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredEightyfourUkBlogModule { }
