import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredFortyoneComponent } from './home-ru-blog-onehundred-fortyone/home-ru-blog-onehundred-fortyone.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredFortyoneComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredFortyoneComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredFortyoneRuBlogModule { }
