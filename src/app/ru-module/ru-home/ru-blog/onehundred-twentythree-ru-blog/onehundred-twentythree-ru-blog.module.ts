import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredTwentythreeComponent } from './home-ru-blog-onehundred-twentythree/home-ru-blog-onehundred-twentythree.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredTwentythreeComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredTwentythreeComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredTwentythreeRuBlogModule { }
