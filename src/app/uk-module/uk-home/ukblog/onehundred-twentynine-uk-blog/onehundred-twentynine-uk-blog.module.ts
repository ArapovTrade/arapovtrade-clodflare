import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredTwentynineComponent } from './home-uk-blog-onehundred-twentynine/home-uk-blog-onehundred-twentynine.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredTwentynineComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredTwentynineComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredTwentynineUkBlogModule { }
