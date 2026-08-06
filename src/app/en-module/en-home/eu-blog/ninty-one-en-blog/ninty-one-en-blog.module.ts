import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogNintyOneComponent } from './home-en-blog-ninty-one/home-en-blog-ninty-one.component';
import { MatExpansionModule } from '@angular/material/expansion';


import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogNintyOneComponent }];

@NgModule({
  declarations: [HomeEnBlogNintyOneComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class NintyOneEnBlogModule { }
