import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredThreeComponent } from './home-ru-blog-onehundred-three/home-ru-blog-onehundred-three.component';

import { MatExpansionModule } from '@angular/material/expansion';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredThreeComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredThreeComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredThreeRuBlogModule { }
