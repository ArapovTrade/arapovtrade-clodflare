import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEuBlogThirtySevenComponent } from './home-eu-blog-thirty-seven/home-eu-blog-thirty-seven.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  { path: '', component: HomeEuBlogThirtySevenComponent },
];

@NgModule({
  declarations: [HomeEuBlogThirtySevenComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class ThirtySevenEuBlogModule {}
