import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredSeventytwoComponent } from './home-en-blog-onehundred-seventytwo/home-en-blog-onehundred-seventytwo.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredSeventytwoComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredSeventytwoComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredSeventytwoEnBlogModule { }
