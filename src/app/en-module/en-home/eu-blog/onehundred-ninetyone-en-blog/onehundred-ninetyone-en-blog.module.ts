import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredNinetyoneComponent } from './home-en-blog-onehundred-ninetyone/home-en-blog-onehundred-ninetyone.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredNinetyoneComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredNinetyoneComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredNinetyoneEnBlogModule { }
