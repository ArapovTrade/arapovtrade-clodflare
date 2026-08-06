import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredFiftythreeComponent } from './home-ru-blog-onehundred-fiftythree/home-ru-blog-onehundred-fiftythree.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredFiftythreeComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredFiftythreeComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredFiftythreeRuBlogModule { }
