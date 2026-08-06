import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogThirteenComponent } from './home-uk-blog-thirteen/home-uk-blog-thirteen.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogThirteenComponent }];

@NgModule({
  declarations: [HomeUkBlogThirteenComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class ThirteenUkBlogModule {}
