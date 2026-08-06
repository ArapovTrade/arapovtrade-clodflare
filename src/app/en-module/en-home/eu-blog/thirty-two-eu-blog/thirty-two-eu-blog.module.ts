import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEuBlogThirtyTwoComponent } from './home-eu-blog-thirty-two/home-eu-blog-thirty-two.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEuBlogThirtyTwoComponent }];

@NgModule({
  declarations: [HomeEuBlogThirtyTwoComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class ThirtyTwoEuBlogModule {}
