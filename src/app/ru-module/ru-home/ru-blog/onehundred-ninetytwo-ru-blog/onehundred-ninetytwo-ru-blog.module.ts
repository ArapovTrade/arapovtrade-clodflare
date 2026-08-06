import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredNinetytwoComponent } from './home-ru-blog-onehundred-ninetytwo/home-ru-blog-onehundred-ninetytwo.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredNinetytwoComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredNinetytwoComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredNinetytwoRuBlogModule { }
