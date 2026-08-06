import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredFortytwoComponent } from './home-uk-blog-onehundred-fortytwo/home-uk-blog-onehundred-fortytwo.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredFortytwoComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredFortytwoComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredFortytwoUkBlogModule { }
