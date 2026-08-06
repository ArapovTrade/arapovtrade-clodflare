import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogSixtySevenComponent } from './home-ru-blog-sixty-seven/home-ru-blog-sixty-seven.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogSixtySevenComponent }];

@NgModule({
  declarations: [HomeRuBlogSixtySevenComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class SixtySevenRuBlogModule {}
