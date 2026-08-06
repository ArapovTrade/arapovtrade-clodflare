import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogNintyFiveComponent } from './home-ru-blog-ninty-five/home-ru-blog-ninty-five.component';
import { MatExpansionModule } from '@angular/material/expansion';


import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogNintyFiveComponent }];

@NgModule({
  declarations: [HomeRuBlogNintyFiveComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class NintyFiveRuBlogModule { }
