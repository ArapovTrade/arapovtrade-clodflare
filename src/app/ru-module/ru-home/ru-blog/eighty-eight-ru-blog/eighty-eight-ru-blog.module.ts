import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogEightyEightComponent } from './home-ru-blog-eighty-eight/home-ru-blog-eighty-eight.component';
import { MatExpansionModule } from '@angular/material/expansion';


import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogEightyEightComponent }];

@NgModule({
  declarations: [HomeRuBlogEightyEightComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class EightyEightRuBlogModule { }
