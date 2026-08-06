import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredFiftyoneComponent } from './home-uk-blog-onehundred-fiftyone/home-uk-blog-onehundred-fiftyone.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredFiftyoneComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredFiftyoneComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredFiftyoneUkBlogModule { }
