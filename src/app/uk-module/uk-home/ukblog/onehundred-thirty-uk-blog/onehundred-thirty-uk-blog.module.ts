import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredThirtyComponent } from './home-uk-blog-onehundred-thirty/home-uk-blog-onehundred-thirty.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredThirtyComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredThirtyComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredThirtyUkBlogModule { }
