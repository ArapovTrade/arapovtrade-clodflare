import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredSixtyComponent } from './home-ru-blog-onehundred-sixty/home-ru-blog-onehundred-sixty.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredSixtyComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredSixtyComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredSixtyRuBlogModule { }
