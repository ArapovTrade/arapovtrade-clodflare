import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredEightyoneComponent } from './home-en-blog-onehundred-eightyone/home-en-blog-onehundred-eightyone.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredEightyoneComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredEightyoneComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredEightyoneEnBlogModule { }
