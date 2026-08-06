import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogElevenComponent } from './home-ru-blog-eleven/home-ru-blog-eleven.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogElevenComponent }];

@NgModule({
  declarations: [HomeRuBlogElevenComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class ElevenRuBlogModule {}
