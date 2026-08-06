import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredSeventysixComponent } from './home-uk-blog-onehundred-seventysix/home-uk-blog-onehundred-seventysix.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredSeventysixComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredSeventysixComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredSeventysixUkBlogModule { }
