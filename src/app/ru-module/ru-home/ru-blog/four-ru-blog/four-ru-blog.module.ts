import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogFourComponent } from './home-ru-blog-four/home-ru-blog-four.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogFourComponent }];

@NgModule({
  declarations: [HomeRuBlogFourComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],

})
export class FourRuBlogModule {}
