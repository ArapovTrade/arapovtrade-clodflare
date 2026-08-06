import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredNinetyfiveComponent } from './home-uk-blog-onehundred-ninetyfive/home-uk-blog-onehundred-ninetyfive.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredNinetyfiveComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredNinetyfiveComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredNinetyfiveUkBlogModule { }
