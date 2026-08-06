import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredFiftysevenComponent } from './home-en-blog-onehundred-fiftyseven/home-en-blog-onehundred-fiftyseven.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredFiftysevenComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredFiftysevenComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredFiftysevenEnBlogModule { }
