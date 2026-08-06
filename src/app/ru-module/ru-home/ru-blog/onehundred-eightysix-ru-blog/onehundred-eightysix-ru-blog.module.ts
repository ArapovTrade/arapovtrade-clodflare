import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredEightysixComponent } from './home-ru-blog-onehundred-eightysix/home-ru-blog-onehundred-eightysix.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredEightysixComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredEightysixComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredEightysixRuBlogModule { }
