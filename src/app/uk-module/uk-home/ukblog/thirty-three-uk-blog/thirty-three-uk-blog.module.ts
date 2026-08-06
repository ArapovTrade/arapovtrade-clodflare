import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogThirtyThreeComponent } from './home-uk-blog-thirty-three/home-uk-blog-thirty-three.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  { path: '', component: HomeUkBlogThirtyThreeComponent },
];

@NgModule({
  declarations: [HomeUkBlogThirtyThreeComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class ThirtyThreeUkBlogModule {}
