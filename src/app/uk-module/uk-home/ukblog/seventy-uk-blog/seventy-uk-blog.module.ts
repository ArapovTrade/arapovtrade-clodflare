import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogSeventyComponent } from './home-uk-blog-seventy/home-uk-blog-seventy.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogSeventyComponent }];

@NgModule({
  declarations: [HomeUkBlogSeventyComponent],
 imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class SeventyUkBlogModule {}
