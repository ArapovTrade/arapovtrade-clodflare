import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogThirtyFiveComponent } from './home-uk-blog-thirty-five/home-uk-blog-thirty-five.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogThirtyFiveComponent }];

@NgModule({
  declarations: [HomeUkBlogThirtyFiveComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class ThirtyFiveUkBlogModule {}
