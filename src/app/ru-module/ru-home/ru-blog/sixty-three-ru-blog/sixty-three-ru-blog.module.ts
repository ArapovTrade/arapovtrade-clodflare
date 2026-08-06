import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogSixtyThreeComponent } from './home-ru-blog-sixty-three/home-ru-blog-sixty-three.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogSixtyThreeComponent }];

@NgModule({
  declarations: [HomeRuBlogSixtyThreeComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class SixtyThreeRuBlogModule {}
