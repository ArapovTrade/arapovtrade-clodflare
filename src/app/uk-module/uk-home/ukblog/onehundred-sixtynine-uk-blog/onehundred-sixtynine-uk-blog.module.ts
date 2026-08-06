import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredSixtynineComponent } from './home-uk-blog-onehundred-sixtynine/home-uk-blog-onehundred-sixtynine.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredSixtynineComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredSixtynineComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredSixtynineUkBlogModule { }
