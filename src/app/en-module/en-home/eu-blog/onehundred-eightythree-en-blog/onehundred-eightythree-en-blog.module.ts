import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredEightythreeComponent } from './home-en-blog-onehundred-eightythree/home-en-blog-onehundred-eightythree.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredEightythreeComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredEightythreeComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredEightythreeEnBlogModule { }
