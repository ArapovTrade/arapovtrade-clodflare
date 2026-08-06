import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogEightyEightComponent } from './home-uk-blog-eighty-eight/home-uk-blog-eighty-eight.component';
import { MatExpansionModule } from '@angular/material/expansion';

import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogEightyEightComponent }];

@NgModule({
  declarations: [HomeUkBlogEightyEightComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class EightyEightUkBlogModule { }
