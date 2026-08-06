import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredNinetythreeComponent } from './home-ru-blog-onehundred-ninetythree/home-ru-blog-onehundred-ninetythree.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredNinetythreeComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredNinetythreeComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredNinetythreeRuBlogModule { }
