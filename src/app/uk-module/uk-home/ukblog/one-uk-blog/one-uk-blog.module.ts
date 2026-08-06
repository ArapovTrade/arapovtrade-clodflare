import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOneComponent } from './home-uk-blog-one/home-uk-blog-one.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOneComponent }];

@NgModule({
  declarations: [HomeUkBlogOneComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OneUkBlogModule {}
