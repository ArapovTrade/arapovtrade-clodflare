import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredFourteenComponent } from './home-uk-blog-onehundred-fourteen/home-uk-blog-onehundred-fourteen.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredFourteenComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredFourteenComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredFourteenUkBlogModule { }
