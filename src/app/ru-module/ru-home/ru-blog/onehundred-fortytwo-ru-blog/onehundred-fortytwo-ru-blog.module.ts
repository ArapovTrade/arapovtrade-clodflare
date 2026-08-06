import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredFortytwoComponent } from './home-ru-blog-onehundred-fortytwo/home-ru-blog-onehundred-fortytwo.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredFortytwoComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredFortytwoComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredFortytwoRuBlogModule { }
