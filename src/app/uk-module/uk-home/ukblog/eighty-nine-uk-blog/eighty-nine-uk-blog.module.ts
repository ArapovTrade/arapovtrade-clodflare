import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogEightyNineComponent } from './home-uk-blog-eighty-nine/home-uk-blog-eighty-nine.component';
import { MatExpansionModule } from '@angular/material/expansion';



import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogEightyNineComponent }];

@NgModule({
  declarations: [HomeUkBlogEightyNineComponent],
imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class EightyNineUkBlogModule { }
