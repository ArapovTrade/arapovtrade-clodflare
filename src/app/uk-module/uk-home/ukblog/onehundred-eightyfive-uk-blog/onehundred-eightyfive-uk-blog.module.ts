import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredEightyfiveComponent } from './home-uk-blog-onehundred-eightyfive/home-uk-blog-onehundred-eightyfive.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredEightyfiveComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredEightyfiveComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredEightyfiveUkBlogModule { }
