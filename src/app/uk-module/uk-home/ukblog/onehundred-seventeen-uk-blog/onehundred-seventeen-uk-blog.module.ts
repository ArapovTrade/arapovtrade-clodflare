import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredSeventeenComponent } from './home-uk-blog-onehundred-seventeen/home-uk-blog-onehundred-seventeen.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredSeventeenComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredSeventeenComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredSeventeenUkBlogModule { }
