import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogNintyNineComponent } from './home-en-blog-ninty-nine/home-en-blog-ninty-nine.component';
import { MatExpansionModule } from '@angular/material/expansion';


import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogNintyNineComponent }];

@NgModule({
  declarations: [HomeEnBlogNintyNineComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class NintyNineEnBlogModule { }
