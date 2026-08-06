import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogFourtyEightComponent } from './home-en-blog-fourty-eight/home-en-blog-fourty-eight.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  { path: '', component: HomeEnBlogFourtyEightComponent },
];

@NgModule({
  declarations: [HomeEnBlogFourtyEightComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class FourtyEightEnBlogModule {}
