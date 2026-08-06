import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredEightynineComponent } from './home-uk-blog-onehundred-eightynine/home-uk-blog-onehundred-eightynine.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredEightynineComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredEightynineComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredEightynineUkBlogModule { }
