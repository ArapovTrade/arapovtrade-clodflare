import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredSixtysevenComponent } from './home-uk-blog-onehundred-sixtyseven/home-uk-blog-onehundred-sixtyseven.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredSixtysevenComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredSixtysevenComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredSixtysevenUkBlogModule { }
