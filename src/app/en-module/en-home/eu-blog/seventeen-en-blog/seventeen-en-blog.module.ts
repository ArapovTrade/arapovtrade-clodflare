import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogSeventeenComponent } from './home-en-blog-seventeen/home-en-blog-seventeen.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogSeventeenComponent }];

@NgModule({
  declarations: [HomeEnBlogSeventeenComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class SeventeenEnBlogModule {}
