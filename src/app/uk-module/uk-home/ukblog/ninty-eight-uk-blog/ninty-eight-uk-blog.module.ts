import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogNintyEightComponent } from './home-uk-blog-ninty-eight/home-uk-blog-ninty-eight.component';
import { MatExpansionModule } from '@angular/material/expansion';


import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogNintyEightComponent }];

@NgModule({
  declarations: [HomeUkBlogNintyEightComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class NintyEightUkBlogModule { }
