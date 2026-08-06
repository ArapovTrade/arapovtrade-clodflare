import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogFourtySevenComponent } from './home-en-blog-fourty-seven/home-en-blog-fourty-seven.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  { path: '', component: HomeEnBlogFourtySevenComponent },
];

@NgModule({
  declarations: [HomeEnBlogFourtySevenComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class FourtySevenEnBlogModule {}
