import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredNinetynineComponent } from './home-ru-blog-onehundred-ninetynine/home-ru-blog-onehundred-ninetynine.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredNinetynineComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredNinetynineComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredNinetynineRuBlogModule { }
