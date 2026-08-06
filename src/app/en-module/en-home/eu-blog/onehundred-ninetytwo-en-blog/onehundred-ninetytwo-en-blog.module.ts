import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredNinetytwoComponent } from './home-en-blog-onehundred-ninetytwo/home-en-blog-onehundred-ninetytwo.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredNinetytwoComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredNinetytwoComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredNinetytwoEnBlogModule { }
