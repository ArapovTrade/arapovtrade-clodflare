import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredEightyoneComponent } from './home-uk-blog-onehundred-eightyone/home-uk-blog-onehundred-eightyone.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredEightyoneComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredEightyoneComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredEightyoneUkBlogModule { }
