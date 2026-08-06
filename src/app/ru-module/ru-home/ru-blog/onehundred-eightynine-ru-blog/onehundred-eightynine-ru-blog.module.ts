import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredEightynineComponent } from './home-ru-blog-onehundred-eightynine/home-ru-blog-onehundred-eightynine.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredEightynineComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredEightynineComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredEightynineRuBlogModule { }
