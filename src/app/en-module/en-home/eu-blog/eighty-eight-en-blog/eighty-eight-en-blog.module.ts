import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogEightyEightComponent } from './home-en-blog-eighty-eight/home-en-blog-eighty-eight.component';
import { MatExpansionModule } from '@angular/material/expansion';


import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogEightyEightComponent }];

@NgModule({
  declarations: [HomeEnBlogEightyEightComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class EightyEightEnBlogModule { }
