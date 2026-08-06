import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredSixtyComponent } from './home-en-blog-onehundred-sixty/home-en-blog-onehundred-sixty.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredSixtyComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredSixtyComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredSixtyEnBlogModule { }
