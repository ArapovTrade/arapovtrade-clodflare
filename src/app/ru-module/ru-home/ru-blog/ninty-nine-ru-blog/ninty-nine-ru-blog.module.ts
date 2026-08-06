import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogNintyNineComponent } from './home-ru-blog-ninty-nine/home-ru-blog-ninty-nine.component';
import { MatExpansionModule } from '@angular/material/expansion';


import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogNintyNineComponent }];

@NgModule({
  declarations: [HomeRuBlogNintyNineComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class NintyNineRuBlogModule { }
