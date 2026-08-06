import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredNinetyoneComponent } from './home-ru-blog-onehundred-ninetyone/home-ru-blog-onehundred-ninetyone.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredNinetyoneComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredNinetyoneComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredNinetyoneRuBlogModule { }
