import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredTwelveComponent } from './home-en-blog-onehundred-twelve/home-en-blog-onehundred-twelve.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredTwelveComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredTwelveComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredTwelveEnBlogModule { }
