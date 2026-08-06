import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredFiftysevenComponent } from './home-ru-blog-onehundred-fiftyseven/home-ru-blog-onehundred-fiftyseven.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredFiftysevenComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredFiftysevenComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredFiftysevenRuBlogModule { }
