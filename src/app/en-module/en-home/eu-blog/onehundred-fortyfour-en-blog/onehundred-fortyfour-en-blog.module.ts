import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredFortyfourComponent } from './home-en-blog-onehundred-fortyfour/home-en-blog-onehundred-fortyfour.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredFortyfourComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredFortyfourComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredFortyfourEnBlogModule { }
