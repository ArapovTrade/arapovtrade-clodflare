import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredSeventysixComponent } from './home-ru-blog-onehundred-seventysix/home-ru-blog-onehundred-seventysix.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredSeventysixComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredSeventysixComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredSeventysixRuBlogModule { }
