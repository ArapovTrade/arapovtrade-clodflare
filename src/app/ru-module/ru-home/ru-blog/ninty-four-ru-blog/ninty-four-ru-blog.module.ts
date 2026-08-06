import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogNintyFourComponent } from './home-ru-blog-ninty-four/home-ru-blog-ninty-four.component';
import { MatExpansionModule } from '@angular/material/expansion';


import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogNintyFourComponent }];

@NgModule({
  declarations: [HomeRuBlogNintyFourComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class NintyFourRuBlogModule { }
