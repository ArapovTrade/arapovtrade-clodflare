import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredFiftynineComponent } from './home-uk-blog-onehundred-fiftynine/home-uk-blog-onehundred-fiftynine.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredFiftynineComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredFiftynineComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredFiftynineUkBlogModule { }
