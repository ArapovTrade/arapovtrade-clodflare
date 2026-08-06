import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEuBlogThirtyThreeComponent } from './home-eu-blog-thirty-three/home-eu-blog-thirty-three.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  { path: '', component: HomeEuBlogThirtyThreeComponent },
];

@NgModule({
  declarations: [HomeEuBlogThirtyThreeComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class ThirtyThreeEuBlogModule {}
