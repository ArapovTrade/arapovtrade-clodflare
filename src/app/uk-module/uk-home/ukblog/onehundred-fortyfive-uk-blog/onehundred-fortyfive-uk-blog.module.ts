import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredFortyfiveComponent } from './home-uk-blog-onehundred-fortyfive/home-uk-blog-onehundred-fortyfive.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredFortyfiveComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredFortyfiveComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredFortyfiveUkBlogModule { }
