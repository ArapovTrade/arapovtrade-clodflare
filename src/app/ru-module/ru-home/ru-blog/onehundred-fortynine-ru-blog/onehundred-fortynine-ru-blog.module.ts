import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredFortynineComponent } from './home-ru-blog-onehundred-fortynine/home-ru-blog-onehundred-fortynine.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredFortynineComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredFortynineComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredFortynineRuBlogModule { }
