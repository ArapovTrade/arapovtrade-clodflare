import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogElevenComponent } from './home-uk-blog-eleven/home-uk-blog-eleven.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogElevenComponent }];

@NgModule({
  declarations: [HomeUkBlogElevenComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class ElevenUkBlogModule {}
