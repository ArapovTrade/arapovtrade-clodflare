import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredSeventythreeComponent } from './home-en-blog-onehundred-seventythree/home-en-blog-onehundred-seventythree.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredSeventythreeComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredSeventythreeComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredSeventythreeEnBlogModule { }
