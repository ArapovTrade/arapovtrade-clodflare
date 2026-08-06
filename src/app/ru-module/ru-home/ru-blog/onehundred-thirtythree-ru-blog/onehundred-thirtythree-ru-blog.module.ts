import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredThirtythreeComponent } from './home-ru-blog-onehundred-thirtythree/home-ru-blog-onehundred-thirtythree.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredThirtythreeComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredThirtythreeComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredThirtythreeRuBlogModule { }
