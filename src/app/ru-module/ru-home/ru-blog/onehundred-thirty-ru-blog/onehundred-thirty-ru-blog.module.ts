import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredThirtyComponent } from './home-ru-blog-onehundred-thirty/home-ru-blog-onehundred-thirty.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredThirtyComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredThirtyComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredThirtyRuBlogModule { }
