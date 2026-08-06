import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEuBlogThirtyOneComponent } from './home-eu-blog-thirty-one/home-eu-blog-thirty-one.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEuBlogThirtyOneComponent }];

@NgModule({
  declarations: [HomeEuBlogThirtyOneComponent],
 imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class ThirtyOneEuBlogModule {}
