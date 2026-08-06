import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredSixtysevenComponent } from './home-en-blog-onehundred-sixtyseven/home-en-blog-onehundred-sixtyseven.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredSixtysevenComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredSixtysevenComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredSixtysevenEnBlogModule { }
