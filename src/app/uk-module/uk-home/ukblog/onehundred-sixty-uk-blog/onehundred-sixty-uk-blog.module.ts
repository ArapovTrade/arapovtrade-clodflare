import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredSixtyComponent } from './home-uk-blog-onehundred-sixty/home-uk-blog-onehundred-sixty.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredSixtyComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredSixtyComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredSixtyUkBlogModule { }
