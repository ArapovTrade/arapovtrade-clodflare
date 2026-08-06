import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogTwohundredComponent } from './home-uk-blog-twohundred/home-uk-blog-twohundred.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogTwohundredComponent }];

@NgModule({
  declarations: [HomeUkBlogTwohundredComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class TwohundredUkBlogModule { }
