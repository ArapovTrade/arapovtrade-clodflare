import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredEightynineComponent } from './home-en-blog-onehundred-eightynine/home-en-blog-onehundred-eightynine.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredEightynineComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredEightynineComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredEightynineEnBlogModule { }
