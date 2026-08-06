import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredFiftyComponent } from './home-ru-blog-onehundred-fifty/home-ru-blog-onehundred-fifty.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredFiftyComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredFiftyComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredFiftyRuBlogModule { }
