import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogFourtyOneComponent } from './home-uk-blog-fourty-one/home-uk-blog-fourty-one.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogFourtyOneComponent }];

@NgModule({
  declarations: [HomeUkBlogFourtyOneComponent],
 imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class FourtyOneUkBlogModule {}
