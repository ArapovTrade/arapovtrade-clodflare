import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogNintyFourComponent } from './home-en-blog-ninty-four/home-en-blog-ninty-four.component';
import { MatExpansionModule } from '@angular/material/expansion';


import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogNintyFourComponent }];

@NgModule({
  declarations: [HomeEnBlogNintyFourComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class NintyFourEnBlogModule { }
