import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredSixtyoneComponent } from './home-uk-blog-onehundred-sixtyone/home-uk-blog-onehundred-sixtyone.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredSixtyoneComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredSixtyoneComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredSixtyoneUkBlogModule { }
