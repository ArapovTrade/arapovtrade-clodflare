import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredFortyoneComponent } from './home-uk-blog-onehundred-fortyone/home-uk-blog-onehundred-fortyone.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredFortyoneComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredFortyoneComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredFortyoneUkBlogModule { }
