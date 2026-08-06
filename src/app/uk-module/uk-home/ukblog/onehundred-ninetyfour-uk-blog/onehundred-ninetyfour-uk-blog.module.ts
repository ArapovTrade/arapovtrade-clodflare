import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredNinetyfourComponent } from './home-uk-blog-onehundred-ninetyfour/home-uk-blog-onehundred-ninetyfour.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredNinetyfourComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredNinetyfourComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredNinetyfourUkBlogModule { }
