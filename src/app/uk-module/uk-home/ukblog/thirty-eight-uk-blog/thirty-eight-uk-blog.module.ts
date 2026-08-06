import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogThirtyEightComponent } from './home-uk-blog-thirty-eight/home-uk-blog-thirty-eight.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  { path: '', component: HomeUkBlogThirtyEightComponent },
];

@NgModule({
  declarations: [HomeUkBlogThirtyEightComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class ThirtyEightUkBlogModule {}
