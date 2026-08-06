import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredEightyfourComponent } from './home-en-blog-onehundred-eightyfour/home-en-blog-onehundred-eightyfour.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredEightyfourComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredEightyfourComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredEightyfourEnBlogModule { }
