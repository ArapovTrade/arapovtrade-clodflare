import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogSeventyOneComponent } from './home-ru-blog-seventy-one/home-ru-blog-seventy-one.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogSeventyOneComponent }];

@NgModule({
  declarations: [HomeRuBlogSeventyOneComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class SeventyOneRuBlogModule {}
