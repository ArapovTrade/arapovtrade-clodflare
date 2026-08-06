import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredSeventynineComponent } from './home-ru-blog-onehundred-seventynine/home-ru-blog-onehundred-seventynine.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredSeventynineComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredSeventynineComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredSeventynineRuBlogModule { }
