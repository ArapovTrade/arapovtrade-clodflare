import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogEightComponent } from './home-ru-blog-eight/home-ru-blog-eight.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogEightComponent }];

@NgModule({
  declarations: [HomeRuBlogEightComponent],
 imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class EightRuBlogModule {}
