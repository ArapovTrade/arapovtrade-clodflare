import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogSeventyEightComponent } from './home-uk-blog-seventy-eight/home-uk-blog-seventy-eight.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  { path: '', component: HomeUkBlogSeventyEightComponent },
];

@NgModule({
  declarations: [HomeUkBlogSeventyEightComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class SeventyEightUkBlogModule {}
