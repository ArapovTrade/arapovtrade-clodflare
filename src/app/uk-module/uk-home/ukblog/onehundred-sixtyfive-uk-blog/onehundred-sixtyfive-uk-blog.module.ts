import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredSixtyfiveComponent } from './home-uk-blog-onehundred-sixtyfive/home-uk-blog-onehundred-sixtyfive.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredSixtyfiveComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredSixtyfiveComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredSixtyfiveUkBlogModule { }
