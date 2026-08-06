import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogSeventyComponent } from './home-ru-blog-seventy/home-ru-blog-seventy.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogSeventyComponent }];

@NgModule({
  declarations: [HomeRuBlogSeventyComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class SeventyRuBlogModule {}
