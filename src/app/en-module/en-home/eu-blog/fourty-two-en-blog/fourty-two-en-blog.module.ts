import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogFourtyTwoComponent } from './home-en-blog-fourty-two/home-en-blog-fourty-two.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogFourtyTwoComponent }];

@NgModule({
  declarations: [HomeEnBlogFourtyTwoComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class FourtyTwoEnBlogModule {}
