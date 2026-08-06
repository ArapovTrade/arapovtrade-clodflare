import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogThirtySevenComponent } from './home-ru-blog-thirty-seven/home-ru-blog-thirty-seven.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  { path: '', component: HomeRuBlogThirtySevenComponent },
];

@NgModule({
  declarations: [HomeRuBlogThirtySevenComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class ThirtySevenRuBlogModule {}
