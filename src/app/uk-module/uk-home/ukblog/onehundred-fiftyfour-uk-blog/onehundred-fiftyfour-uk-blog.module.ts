import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredFiftyfourComponent } from './home-uk-blog-onehundred-fiftyfour/home-uk-blog-onehundred-fiftyfour.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredFiftyfourComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredFiftyfourComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredFiftyfourUkBlogModule { }
