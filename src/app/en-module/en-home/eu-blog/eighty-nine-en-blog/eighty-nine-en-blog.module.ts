import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogEightyNineComponent } from './home-en-blog-eighty-nine/home-en-blog-eighty-nine.component';



import { MatExpansionModule } from '@angular/material/expansion';


import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogEightyNineComponent }];

@NgModule({
  declarations: [HomeEnBlogEightyNineComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class EightyNineEnBlogModule { }
