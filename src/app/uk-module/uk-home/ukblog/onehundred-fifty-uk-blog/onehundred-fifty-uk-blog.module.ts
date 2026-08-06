import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredFiftyComponent } from './home-uk-blog-onehundred-fifty/home-uk-blog-onehundred-fifty.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredFiftyComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredFiftyComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredFiftyUkBlogModule { }
