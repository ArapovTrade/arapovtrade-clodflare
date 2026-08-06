import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogThreeComponent } from './home-en-blog-three/home-en-blog-three.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogThreeComponent }];

@NgModule({
  declarations: [HomeEnBlogThreeComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class ThreeEnBlogModule {}
