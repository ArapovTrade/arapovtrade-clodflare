import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogNintyEightComponent } from './home-ru-blog-ninty-eight/home-ru-blog-ninty-eight.component';

import { MatExpansionModule } from '@angular/material/expansion';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogNintyEightComponent }];

@NgModule({
  declarations: [HomeRuBlogNintyEightComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class NintyEightRuBlogModule { }
