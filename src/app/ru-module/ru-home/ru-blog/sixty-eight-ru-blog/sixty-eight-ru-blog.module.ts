import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogSixtyEightComponent } from './home-ru-blog-sixty-eight/home-ru-blog-sixty-eight.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogSixtyEightComponent }];

@NgModule({
  declarations: [HomeRuBlogSixtyEightComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class SixtyEightRuBlogModule {}
