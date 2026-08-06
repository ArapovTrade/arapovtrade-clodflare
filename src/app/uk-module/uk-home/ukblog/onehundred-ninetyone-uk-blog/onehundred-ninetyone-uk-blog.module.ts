import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredNinetyoneComponent } from './home-uk-blog-onehundred-ninetyone/home-uk-blog-onehundred-ninetyone.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredNinetyoneComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredNinetyoneComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredNinetyoneUkBlogModule { }
