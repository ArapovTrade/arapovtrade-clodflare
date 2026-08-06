import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogEightyFiveComponent } from './home-ru-blog-eighty-five/home-ru-blog-eighty-five.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogEightyFiveComponent }];

@NgModule({
  declarations: [HomeRuBlogEightyFiveComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class EightyFiveRuBlogModule {}
