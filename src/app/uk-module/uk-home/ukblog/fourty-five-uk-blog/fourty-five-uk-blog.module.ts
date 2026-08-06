import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogFourtyFiveComponent } from './home-uk-blog-fourty-five/home-uk-blog-fourty-five.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogFourtyFiveComponent }];

@NgModule({
  declarations: [HomeUkBlogFourtyFiveComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class FourtyFiveUkBlogModule {}
