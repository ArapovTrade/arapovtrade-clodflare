import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogFiftyThreeComponent } from './home-ru-blog-fifty-three/home-ru-blog-fifty-three.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogFiftyThreeComponent }];

@NgModule({
  declarations: [HomeRuBlogFiftyThreeComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class FiftyThreeRuBlogModule {}
