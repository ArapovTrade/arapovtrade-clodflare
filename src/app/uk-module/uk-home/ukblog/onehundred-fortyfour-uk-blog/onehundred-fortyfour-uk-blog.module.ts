import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredFortyfourComponent } from './home-uk-blog-onehundred-fortyfour/home-uk-blog-onehundred-fortyfour.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredFortyfourComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredFortyfourComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredFortyfourUkBlogModule { }
