import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredNinetyComponent } from './home-ru-blog-onehundred-ninety/home-ru-blog-onehundred-ninety.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredNinetyComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredNinetyComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredNinetyRuBlogModule { }
