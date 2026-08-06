import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredTwentythreeComponent } from './home-uk-blog-onehundred-twentythree/home-uk-blog-onehundred-twentythree.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredTwentythreeComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredTwentythreeComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredTwentythreeUkBlogModule { }
