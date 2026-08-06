import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEuBlogThirtyFiveComponent } from './home-eu-blog-thirty-five/home-eu-blog-thirty-five.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEuBlogThirtyFiveComponent }];

@NgModule({
  declarations: [HomeEuBlogThirtyFiveComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class ThirtyFiveEuBlogModule {}
