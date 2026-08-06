import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredThreeComponent } from './home-uk-blog-onehundred-three/home-uk-blog-onehundred-three.component';
import { MatExpansionModule } from '@angular/material/expansion';


import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredThreeComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredThreeComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredThreeUkBlogModule { }
