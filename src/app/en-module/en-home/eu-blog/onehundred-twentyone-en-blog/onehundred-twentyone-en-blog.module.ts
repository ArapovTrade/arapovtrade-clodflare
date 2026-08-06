import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredTwentyoneComponent } from './home-en-blog-onehundred-twentyone/home-en-blog-onehundred-twentyone.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredTwentyoneComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredTwentyoneComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredTwentyoneEnBlogModule { }
