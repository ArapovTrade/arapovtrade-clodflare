import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogNintyThreeComponent } from './home-ru-blog-ninty-three/home-ru-blog-ninty-three.component';

import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogNintyThreeComponent }];

@NgModule({
  declarations: [HomeRuBlogNintyThreeComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class NintyThreeRuBlogModule { }
