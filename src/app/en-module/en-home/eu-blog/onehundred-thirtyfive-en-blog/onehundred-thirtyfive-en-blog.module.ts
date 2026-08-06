import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredThirtyfiveComponent } from './home-en-blog-onehundred-thirtyfive/home-en-blog-onehundred-thirtyfive.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredThirtyfiveComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredThirtyfiveComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredThirtyfiveEnBlogModule { }
