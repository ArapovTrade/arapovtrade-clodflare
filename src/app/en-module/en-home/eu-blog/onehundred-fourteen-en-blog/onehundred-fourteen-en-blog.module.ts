import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredFourteenComponent } from './home-en-blog-onehundred-fourteen/home-en-blog-onehundred-fourteen.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredFourteenComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredFourteenComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredFourteenEnBlogModule { }
