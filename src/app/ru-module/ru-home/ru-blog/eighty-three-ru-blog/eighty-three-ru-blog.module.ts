import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogEightyThreeComponent } from './home-ru-blog-eighty-three/home-ru-blog-eighty-three.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  { path: '', component: HomeRuBlogEightyThreeComponent },
];

@NgModule({
  declarations: [HomeRuBlogEightyThreeComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class EightyThreeRuBlogModule {}
