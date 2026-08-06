import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogThirtyNineComponent } from './home-uk-blog-thirty-nine/home-uk-blog-thirty-nine.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogThirtyNineComponent }];

@NgModule({
  declarations: [HomeUkBlogThirtyNineComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class ThirtyNineUkBlogModule {}
