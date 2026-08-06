import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredNinetysevenComponent } from './home-uk-blog-onehundred-ninetyseven/home-uk-blog-onehundred-ninetyseven.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredNinetysevenComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredNinetysevenComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredNinetysevenUkBlogModule { }
