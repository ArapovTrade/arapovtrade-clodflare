import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredSixtynineComponent } from './home-ru-blog-onehundred-sixtynine/home-ru-blog-onehundred-sixtynine.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredSixtynineComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredSixtynineComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredSixtynineRuBlogModule { }
