import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogSixtyThreeComponent } from './home-en-blog-sixty-three/home-en-blog-sixty-three.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogSixtyThreeComponent }];

@NgModule({
  declarations: [HomeEnBlogSixtyThreeComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class SixtyThreeEnBlogModule {}
