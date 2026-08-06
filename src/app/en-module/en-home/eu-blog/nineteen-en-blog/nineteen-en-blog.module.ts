import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogNineteenComponent } from './home-en-blog-nineteen/home-en-blog-nineteen.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogNineteenComponent }];

@NgModule({
  declarations: [HomeEnBlogNineteenComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class NineteenEnBlogModule {}
