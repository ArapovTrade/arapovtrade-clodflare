import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredSeventeenComponent } from './home-ru-blog-onehundred-seventeen/home-ru-blog-onehundred-seventeen.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredSeventeenComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredSeventeenComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredSeventeenRuBlogModule { }
