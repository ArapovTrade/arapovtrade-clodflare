import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogNintyEightComponent } from './home-en-blog-ninty-eight/home-en-blog-ninty-eight.component';
import { MatExpansionModule } from '@angular/material/expansion';


import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogNintyEightComponent }];

@NgModule({
  declarations: [HomeEnBlogNintyEightComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class NintyEightEnBlogModule { }
