import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredEightysixComponent } from './home-uk-blog-onehundred-eightysix/home-uk-blog-onehundred-eightysix.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredEightysixComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredEightysixComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredEightysixUkBlogModule { }
