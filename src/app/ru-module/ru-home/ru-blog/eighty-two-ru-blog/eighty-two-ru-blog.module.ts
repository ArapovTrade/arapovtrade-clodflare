import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogEightyTwoComponent } from './home-ru-blog-eighty-two/home-ru-blog-eighty-two.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogEightyTwoComponent }];

@NgModule({
  declarations: [HomeRuBlogEightyTwoComponent],
  imports: [CommonModule, MatExpansionModule, RouterModule.forChild(routes)],
})
export class EightyTwoRuBlogModule {}
