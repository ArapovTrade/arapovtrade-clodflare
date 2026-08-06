import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogThirtyComponent } from './home-ru-blog-thirty/home-ru-blog-thirty.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogThirtyComponent }];

@NgModule({
  declarations: [HomeRuBlogThirtyComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class ThirtyRuBlogModule {}
