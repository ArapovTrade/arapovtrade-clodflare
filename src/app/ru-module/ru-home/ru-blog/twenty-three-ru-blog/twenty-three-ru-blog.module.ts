import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogTwentyThreeComponent } from './home-ru-blog-twenty-three/home-ru-blog-twenty-three.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  { path: '', component: HomeRuBlogTwentyThreeComponent },
];

@NgModule({
  declarations: [HomeRuBlogTwentyThreeComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class TwentyThreeRuBlogModule {}
