import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogSixtyFourComponent } from './home-uk-blog-sixty-four/home-uk-blog-sixty-four.component';
import { MatExpansionModule } from '@angular/material/expansion';

import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogSixtyFourComponent }];

@NgModule({
  declarations: [HomeUkBlogSixtyFourComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class SixtyFourUkBlogModule {}
