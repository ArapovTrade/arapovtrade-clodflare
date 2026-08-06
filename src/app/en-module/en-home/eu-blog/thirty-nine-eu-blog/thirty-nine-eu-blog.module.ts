import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEuBlogThirtyNineComponent } from './home-eu-blog-thirty-nine/home-eu-blog-thirty-nine.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEuBlogThirtyNineComponent }];

@NgModule({
  declarations: [HomeEuBlogThirtyNineComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class ThirtyNineEuBlogModule {}
