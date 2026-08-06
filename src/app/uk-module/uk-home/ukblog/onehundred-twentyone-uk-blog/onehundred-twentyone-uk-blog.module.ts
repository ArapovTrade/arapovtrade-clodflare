import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredTwentyoneComponent } from './home-uk-blog-onehundred-twentyone/home-uk-blog-onehundred-twentyone.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredTwentyoneComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredTwentyoneComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredTwentyoneUkBlogModule { }
