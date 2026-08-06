import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredNinetyComponent } from './home-uk-blog-onehundred-ninety/home-uk-blog-onehundred-ninety.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredNinetyComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredNinetyComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredNinetyUkBlogModule { }
