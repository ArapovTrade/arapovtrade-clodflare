import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogThirtyOneComponent } from './home-ru-blog-thirty-one/home-ru-blog-thirty-one.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogThirtyOneComponent }];

@NgModule({
  declarations: [HomeRuBlogThirtyOneComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class ThirtyOneRuBlogModule {}
