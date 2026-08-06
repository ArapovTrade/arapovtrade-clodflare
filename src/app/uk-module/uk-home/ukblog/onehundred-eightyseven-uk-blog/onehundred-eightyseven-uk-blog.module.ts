import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredEightysevenComponent } from './home-uk-blog-onehundred-eightyseven/home-uk-blog-onehundred-eightyseven.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredEightysevenComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredEightysevenComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredEightysevenUkBlogModule { }
