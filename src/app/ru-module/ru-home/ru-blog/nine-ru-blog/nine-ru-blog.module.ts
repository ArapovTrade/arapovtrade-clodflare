import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogNineComponent } from './home-ru-blog-nine/home-ru-blog-nine.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogNineComponent }];

@NgModule({
  declarations: [HomeRuBlogNineComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class NineRuBlogModule {}
