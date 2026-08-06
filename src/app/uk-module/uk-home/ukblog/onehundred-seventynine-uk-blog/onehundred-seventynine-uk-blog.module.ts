import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredSeventynineComponent } from './home-uk-blog-onehundred-seventynine/home-uk-blog-onehundred-seventynine.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredSeventynineComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredSeventynineComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredSeventynineUkBlogModule { }
