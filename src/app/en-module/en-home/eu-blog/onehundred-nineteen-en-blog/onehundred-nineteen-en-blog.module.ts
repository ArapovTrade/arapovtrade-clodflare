import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredNineteenComponent } from './home-en-blog-onehundred-nineteen/home-en-blog-onehundred-nineteen.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredNineteenComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredNineteenComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredNineteenEnBlogModule { }
