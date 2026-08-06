import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogNineteenComponent } from './home-ru-blog-nineteen/home-ru-blog-nineteen.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogNineteenComponent }];

@NgModule({
  declarations: [HomeRuBlogNineteenComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class NineteenRuBlogModule {}
