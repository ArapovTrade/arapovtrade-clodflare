import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogSeventyComponent } from './home-en-blog-seventy/home-en-blog-seventy.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogSeventyComponent }];

@NgModule({
  declarations: [HomeEnBlogSeventyComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class SeventyEnBlogModule {}
