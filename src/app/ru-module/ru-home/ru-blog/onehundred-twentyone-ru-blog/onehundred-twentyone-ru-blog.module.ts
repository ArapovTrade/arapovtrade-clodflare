import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredTwentyoneComponent } from './home-ru-blog-onehundred-twentyone/home-ru-blog-onehundred-twentyone.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredTwentyoneComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredTwentyoneComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredTwentyoneRuBlogModule { }
