import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogEightySevenComponent } from './home-ru-blog-eighty-seven/home-ru-blog-eighty-seven.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  { path: '', component: HomeRuBlogEightySevenComponent },
];

@NgModule({
  declarations: [HomeRuBlogEightySevenComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class EightySevenRuBlogModule {}
