import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogEightyNineComponent } from './home-ru-blog-eighty-nine/home-ru-blog-eighty-nine.component';
import { MatExpansionModule } from '@angular/material/expansion';


import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogEightyNineComponent }];

@NgModule({
  declarations: [HomeRuBlogEightyNineComponent],
 imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class EightyNineRuBlogModule { }
