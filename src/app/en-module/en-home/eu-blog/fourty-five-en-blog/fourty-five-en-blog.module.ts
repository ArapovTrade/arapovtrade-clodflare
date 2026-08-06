import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogFourtyFiveComponent } from './home-en-blog-fourty-five/home-en-blog-fourty-five.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogFourtyFiveComponent }];

@NgModule({
  declarations: [HomeEnBlogFourtyFiveComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class FourtyFiveEnBlogModule {}
