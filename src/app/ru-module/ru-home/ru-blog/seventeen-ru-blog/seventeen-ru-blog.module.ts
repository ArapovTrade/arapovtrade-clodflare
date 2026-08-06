import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogSeventeenComponent } from './home-ru-blog-seventeen/home-ru-blog-seventeen.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogSeventeenComponent }];

@NgModule({
  declarations: [HomeRuBlogSeventeenComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class SeventeenRuBlogModule {}
