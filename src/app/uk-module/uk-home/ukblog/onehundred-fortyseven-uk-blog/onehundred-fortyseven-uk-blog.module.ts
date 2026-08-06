import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredFortysevenComponent } from './home-uk-blog-onehundred-fortyseven/home-uk-blog-onehundred-fortyseven.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredFortysevenComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredFortysevenComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredFortysevenUkBlogModule { }
