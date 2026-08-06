import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogFourtyFourComponent } from './home-uk-blog-fourty-four/home-uk-blog-fourty-four.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogFourtyFourComponent }];

@NgModule({
  declarations: [HomeUkBlogFourtyFourComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class FourtyFourUkBlogModule {}
