import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredSixComponent } from './home-uk-blog-onehundred-six/home-uk-blog-onehundred-six.component';



import { MatExpansionModule } from '@angular/material/expansion';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredSixComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredSixComponent],
  imports: [CommonModule, MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredSixUkBlogModule { }
