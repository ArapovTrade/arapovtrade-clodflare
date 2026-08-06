import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredSeventythreeComponent } from './home-ru-blog-onehundred-seventythree/home-ru-blog-onehundred-seventythree.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredSeventythreeComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredSeventythreeComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredSeventythreeRuBlogModule { }
