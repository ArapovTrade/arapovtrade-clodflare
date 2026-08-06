import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogTwohundredComponent } from './home-ru-blog-twohundred/home-ru-blog-twohundred.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogTwohundredComponent }];

@NgModule({
  declarations: [HomeRuBlogTwohundredComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class TwohundredRuBlogModule { }
