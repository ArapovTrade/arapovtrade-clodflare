import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredTwentyComponent } from './home-en-blog-onehundred-twenty/home-en-blog-onehundred-twenty.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredTwentyComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredTwentyComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredTwentyEnBlogModule { }
