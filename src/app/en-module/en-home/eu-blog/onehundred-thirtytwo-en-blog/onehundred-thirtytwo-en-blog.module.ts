import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredThirtytwoComponent } from './home-en-blog-onehundred-thirtytwo/home-en-blog-onehundred-thirtytwo.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredThirtytwoComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredThirtytwoComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredThirtytwoEnBlogModule { }
