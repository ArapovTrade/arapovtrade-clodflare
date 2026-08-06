import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredEightyfiveComponent } from './home-en-blog-onehundred-eightyfive/home-en-blog-onehundred-eightyfive.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredEightyfiveComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredEightyfiveComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredEightyfiveEnBlogModule { }
