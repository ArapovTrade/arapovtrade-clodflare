import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredFiftyfiveComponent } from './home-uk-blog-onehundred-fiftyfive/home-uk-blog-onehundred-fiftyfive.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredFiftyfiveComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredFiftyfiveComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredFiftyfiveUkBlogModule { }
