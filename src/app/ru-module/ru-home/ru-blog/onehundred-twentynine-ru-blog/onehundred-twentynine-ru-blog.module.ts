import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredTwentynineComponent } from './home-ru-blog-onehundred-twentynine/home-ru-blog-onehundred-twentynine.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredTwentynineComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredTwentynineComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredTwentynineRuBlogModule { }
