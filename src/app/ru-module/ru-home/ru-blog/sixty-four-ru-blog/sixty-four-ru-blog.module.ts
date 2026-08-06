import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogSixtyFourComponent } from './home-ru-blog-sixty-four/home-ru-blog-sixty-four.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogSixtyFourComponent }];

@NgModule({
  declarations: [HomeRuBlogSixtyFourComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class SixtyFourRuBlogModule {}
