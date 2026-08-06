import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogFourtySevenComponent } from './home-uk-blog-fourty-seven/home-uk-blog-fourty-seven.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  { path: '', component: HomeUkBlogFourtySevenComponent },
];

@NgModule({
  declarations: [HomeUkBlogFourtySevenComponent],
 imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class FourtySevenUkBlogModule {}
