import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogFiftyNineComponent } from './home-ru-blog-fifty-nine/home-ru-blog-fifty-nine.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogFiftyNineComponent }];

@NgModule({
  declarations: [HomeRuBlogFiftyNineComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class FiftyNineRuBlogModule {}
