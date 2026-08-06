import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredThirtynineComponent } from './home-en-blog-onehundred-thirtynine/home-en-blog-onehundred-thirtynine.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredThirtynineComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredThirtynineComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredThirtynineEnBlogModule { }
