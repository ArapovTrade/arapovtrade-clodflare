import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogThirteenComponent } from './home-ru-blog-thirteen/home-ru-blog-thirteen.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogThirteenComponent }];

@NgModule({
  declarations: [HomeRuBlogThirteenComponent],
 imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],

})
export class ThirteenRuBlogModule {}
