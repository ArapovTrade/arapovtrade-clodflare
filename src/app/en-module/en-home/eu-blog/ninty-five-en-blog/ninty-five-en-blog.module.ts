import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogNintyFiveComponent } from './home-en-blog-ninty-five/home-en-blog-ninty-five.component';
import { MatExpansionModule } from '@angular/material/expansion';


import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogNintyFiveComponent }];

@NgModule({
  declarations: [HomeEnBlogNintyFiveComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class NintyFiveEnBlogModule { }
