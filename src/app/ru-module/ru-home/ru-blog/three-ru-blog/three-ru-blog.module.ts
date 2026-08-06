import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogThreeComponent } from './home-ru-blog-three/home-ru-blog-three.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogThreeComponent }];

@NgModule({
  declarations: [HomeRuBlogThreeComponent],
 imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class ThreeRuBlogModule {}
