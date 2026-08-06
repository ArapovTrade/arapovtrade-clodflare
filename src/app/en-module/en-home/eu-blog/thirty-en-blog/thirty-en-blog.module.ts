import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogThirtyComponent } from './home-en-blog-thirty/home-en-blog-thirty.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogThirtyComponent }];

@NgModule({
  declarations: [HomeEnBlogThirtyComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class ThirtyEnBlogModule {}
