import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredFortynineComponent } from './home-uk-blog-onehundred-fortynine/home-uk-blog-onehundred-fortynine.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredFortynineComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredFortynineComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredFortynineUkBlogModule { }
