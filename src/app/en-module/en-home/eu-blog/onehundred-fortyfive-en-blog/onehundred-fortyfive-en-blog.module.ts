import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredFortyfiveComponent } from './home-en-blog-onehundred-fortyfive/home-en-blog-onehundred-fortyfive.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredFortyfiveComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredFortyfiveComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredFortyfiveEnBlogModule { }
