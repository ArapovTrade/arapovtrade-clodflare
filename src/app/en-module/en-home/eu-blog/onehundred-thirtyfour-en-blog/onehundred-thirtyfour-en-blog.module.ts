import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredThirtyfourComponent } from './home-en-blog-onehundred-thirtyfour/home-en-blog-onehundred-thirtyfour.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredThirtyfourComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredThirtyfourComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredThirtyfourEnBlogModule { }
