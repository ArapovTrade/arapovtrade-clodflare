import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredTwentytwoComponent } from './home-en-blog-onehundred-twentytwo/home-en-blog-onehundred-twentytwo.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredTwentytwoComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredTwentytwoComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredTwentytwoEnBlogModule { }
