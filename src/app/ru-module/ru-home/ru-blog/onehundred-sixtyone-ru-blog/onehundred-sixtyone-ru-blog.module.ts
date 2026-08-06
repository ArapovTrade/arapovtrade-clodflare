import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredSixtyoneComponent } from './home-ru-blog-onehundred-sixtyone/home-ru-blog-onehundred-sixtyone.component';


import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredSixtyoneComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredSixtyoneComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredSixtyoneRuBlogModule { }
