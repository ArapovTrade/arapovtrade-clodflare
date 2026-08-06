import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredSixtyoneComponent } from './home-en-blog-onehundred-sixtyone/home-en-blog-onehundred-sixtyone.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredSixtyoneComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredSixtyoneComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredSixtyoneEnBlogModule { }
