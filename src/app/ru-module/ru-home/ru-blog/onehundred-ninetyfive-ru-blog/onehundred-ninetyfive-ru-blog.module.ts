import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredNinetyfiveComponent } from './home-ru-blog-onehundred-ninetyfive/home-ru-blog-onehundred-ninetyfive.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredNinetyfiveComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredNinetyfiveComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredNinetyfiveRuBlogModule { }
