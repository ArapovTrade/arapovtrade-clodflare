import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogEightComponent } from './home-uk-blog-eight/home-uk-blog-eight.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogEightComponent }];

@NgModule({
  declarations: [HomeUkBlogEightComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class EightUkBlogModule {}
