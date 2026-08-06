import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredFiftynineComponent } from './home-ru-blog-onehundred-fiftynine/home-ru-blog-onehundred-fiftynine.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredFiftynineComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredFiftynineComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredFiftynineRuBlogModule { }
