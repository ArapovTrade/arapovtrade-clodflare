import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogNintyOneComponent } from './home-uk-blog-ninty-one/home-uk-blog-ninty-one.component';
import { MatExpansionModule } from '@angular/material/expansion';


import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogNintyOneComponent }];

@NgModule({
  declarations: [HomeUkBlogNintyOneComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class NintyOneUkBlogModule { }
