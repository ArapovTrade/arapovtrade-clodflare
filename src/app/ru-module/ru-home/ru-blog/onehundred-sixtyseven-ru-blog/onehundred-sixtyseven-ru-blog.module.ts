import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredSixtysevenComponent } from './home-ru-blog-onehundred-sixtyseven/home-ru-blog-onehundred-sixtyseven.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredSixtysevenComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredSixtysevenComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredSixtysevenRuBlogModule { }
