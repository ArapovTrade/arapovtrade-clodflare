import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogFourtyFourComponent } from './home-en-blog-fourty-four/home-en-blog-fourty-four.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogFourtyFourComponent }];

@NgModule({
  declarations: [HomeEnBlogFourtyFourComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class FourtyFourEnBlogModule {}
