import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredNinetysevenComponent } from './home-ru-blog-onehundred-ninetyseven/home-ru-blog-onehundred-ninetyseven.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredNinetysevenComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredNinetysevenComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredNinetysevenRuBlogModule { }
