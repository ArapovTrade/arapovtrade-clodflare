import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredFifteenComponent } from './home-uk-blog-onehundred-fifteen/home-uk-blog-onehundred-fifteen.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredFifteenComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredFifteenComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredFifteenUkBlogModule { }
