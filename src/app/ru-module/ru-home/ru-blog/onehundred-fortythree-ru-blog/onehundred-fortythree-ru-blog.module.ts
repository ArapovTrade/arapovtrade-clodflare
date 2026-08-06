import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredFortythreeComponent } from './home-ru-blog-onehundred-fortythree/home-ru-blog-onehundred-fortythree.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredFortythreeComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredFortythreeComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredFortythreeRuBlogModule { }
