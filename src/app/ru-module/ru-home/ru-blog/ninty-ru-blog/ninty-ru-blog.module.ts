import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogNintyComponent } from './home-ru-blog-ninty/home-ru-blog-ninty.component';
import { MatExpansionModule } from '@angular/material/expansion';


import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogNintyComponent }];

@NgModule({
  declarations: [HomeRuBlogNintyComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class NintyRuBlogModule { }
