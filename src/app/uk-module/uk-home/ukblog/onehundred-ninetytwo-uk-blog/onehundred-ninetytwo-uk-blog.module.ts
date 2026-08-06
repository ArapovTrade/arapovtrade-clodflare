import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredNinetytwoComponent } from './home-uk-blog-onehundred-ninetytwo/home-uk-blog-onehundred-ninetytwo.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredNinetytwoComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredNinetytwoComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredNinetytwoUkBlogModule { }
