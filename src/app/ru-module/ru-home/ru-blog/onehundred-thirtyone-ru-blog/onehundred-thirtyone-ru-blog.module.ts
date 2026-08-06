import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredThirtyoneComponent } from './home-ru-blog-onehundred-thirtyone/home-ru-blog-onehundred-thirtyone.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredThirtyoneComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredThirtyoneComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredThirtyoneRuBlogModule { }
