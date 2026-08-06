import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogNintyComponent } from './home-en-blog-ninty/home-en-blog-ninty.component';
import { MatExpansionModule } from '@angular/material/expansion';


import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogNintyComponent }];

@NgModule({
  declarations: [HomeEnBlogNintyComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class NintyEnBlogModule { }
