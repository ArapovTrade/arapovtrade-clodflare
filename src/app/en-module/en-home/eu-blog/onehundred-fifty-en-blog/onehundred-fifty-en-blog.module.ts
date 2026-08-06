import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredFiftyComponent } from './home-en-blog-onehundred-fifty/home-en-blog-onehundred-fifty.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredFiftyComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredFiftyComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredFiftyEnBlogModule { }
