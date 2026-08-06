import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredFiftyoneComponent } from './home-en-blog-onehundred-fiftyone/home-en-blog-onehundred-fiftyone.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredFiftyoneComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredFiftyoneComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredFiftyoneEnBlogModule { }
