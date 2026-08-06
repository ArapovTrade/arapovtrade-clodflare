import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredNinetysevenComponent } from './home-en-blog-onehundred-ninetyseven/home-en-blog-onehundred-ninetyseven.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredNinetysevenComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredNinetysevenComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredNinetysevenEnBlogModule { }
