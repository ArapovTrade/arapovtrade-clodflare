import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogThirtyEightComponent } from './home-ru-blog-thirty-eight/home-ru-blog-thirty-eight.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  { path: '', component: HomeRuBlogThirtyEightComponent },
];

@NgModule({
  declarations: [HomeRuBlogThirtyEightComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class ThirtyEightRuBlogModule {}
