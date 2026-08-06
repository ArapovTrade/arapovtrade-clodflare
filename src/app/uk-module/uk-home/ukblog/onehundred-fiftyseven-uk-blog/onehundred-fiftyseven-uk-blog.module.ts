import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredFiftysevenComponent } from './home-uk-blog-onehundred-fiftyseven/home-uk-blog-onehundred-fiftyseven.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredFiftysevenComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredFiftysevenComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredFiftysevenUkBlogModule { }
