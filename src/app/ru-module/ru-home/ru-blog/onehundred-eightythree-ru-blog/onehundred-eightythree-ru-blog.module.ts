import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredEightythreeComponent } from './home-ru-blog-onehundred-eightythree/home-ru-blog-onehundred-eightythree.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredEightythreeComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredEightythreeComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredEightythreeRuBlogModule { }
