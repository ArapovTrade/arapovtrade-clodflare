import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogNintyTwoComponent } from './home-ru-blog-ninty-two/home-ru-blog-ninty-two.component';
import { MatExpansionModule } from '@angular/material/expansion';


import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogNintyTwoComponent }];

@NgModule({
  declarations: [HomeRuBlogNintyTwoComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class NintyTwoRuBlogModule { }
