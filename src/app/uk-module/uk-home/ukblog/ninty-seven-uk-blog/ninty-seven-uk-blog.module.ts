import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogNintySevenComponent } from './home-uk-blog-ninty-seven/home-uk-blog-ninty-seven.component';
import { MatExpansionModule } from '@angular/material/expansion';


import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogNintySevenComponent }];

@NgModule({
  declarations: [HomeUkBlogNintySevenComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class NintySevenUkBlogModule { }
