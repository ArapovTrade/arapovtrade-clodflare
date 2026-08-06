import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogSeventyThreeComponent } from './home-ru-blog-seventy-three/home-ru-blog-seventy-three.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  { path: '', component: HomeRuBlogSeventyThreeComponent },
];

@NgModule({
  declarations: [HomeRuBlogSeventyThreeComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class SeventyThreeRuBlogModule {}
