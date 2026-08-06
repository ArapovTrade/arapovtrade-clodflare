import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogNintySevenComponent } from './home-en-blog-ninty-seven/home-en-blog-ninty-seven.component';

import { MatExpansionModule } from '@angular/material/expansion';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogNintySevenComponent }];

@NgModule({
  declarations: [HomeEnBlogNintySevenComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class NintySevenEnBlogModule { }
