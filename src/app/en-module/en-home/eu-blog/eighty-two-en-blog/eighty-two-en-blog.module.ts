import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogEightyTwoComponent } from './home-en-blog-eighty-two/home-en-blog-eighty-two.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogEightyTwoComponent }];

@NgModule({
  declarations: [HomeEnBlogEightyTwoComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class EightyTwoEnBlogModule {}
