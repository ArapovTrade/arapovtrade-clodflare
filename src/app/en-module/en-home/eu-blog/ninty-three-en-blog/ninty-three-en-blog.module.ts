import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogNintyThreeComponent } from './home-en-blog-ninty-three/home-en-blog-ninty-three.component';
import { MatExpansionModule } from '@angular/material/expansion';


import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogNintyThreeComponent }];

@NgModule({
  declarations: [HomeEnBlogNintyThreeComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class NintyThreeEnBlogModule { }
