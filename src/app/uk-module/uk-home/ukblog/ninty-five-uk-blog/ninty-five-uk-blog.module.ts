import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogNintyFiveComponent } from './home-uk-blog-ninty-five/home-uk-blog-ninty-five.component';
import { MatExpansionModule } from '@angular/material/expansion';


import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogNintyFiveComponent }];

@NgModule({
  declarations: [HomeUkBlogNintyFiveComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class NintyFiveUkBlogModule { }
