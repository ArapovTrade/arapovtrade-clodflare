import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogElevenComponent } from './home-en-blog-eleven/home-en-blog-eleven.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogElevenComponent }];

@NgModule({
  declarations: [HomeEnBlogElevenComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class ElevenEnBlogModule {}
