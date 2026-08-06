import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredFiftytwoComponent } from './home-uk-blog-onehundred-fiftytwo/home-uk-blog-onehundred-fiftytwo.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredFiftytwoComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredFiftytwoComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredFiftytwoUkBlogModule { }
