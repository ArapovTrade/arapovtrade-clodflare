import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredFortytwoComponent } from './home-en-blog-onehundred-fortytwo/home-en-blog-onehundred-fortytwo.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredFortytwoComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredFortytwoComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredFortytwoEnBlogModule { }
