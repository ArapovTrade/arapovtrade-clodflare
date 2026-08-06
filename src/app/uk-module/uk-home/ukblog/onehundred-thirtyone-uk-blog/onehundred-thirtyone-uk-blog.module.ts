import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredThirtyoneComponent } from './home-uk-blog-onehundred-thirtyone/home-uk-blog-onehundred-thirtyone.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredThirtyoneComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredThirtyoneComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredThirtyoneUkBlogModule { }
