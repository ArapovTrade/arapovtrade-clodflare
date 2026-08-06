import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogEightySevenComponent } from './home-uk-blog-eighty-seven/home-uk-blog-eighty-seven.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  { path: '', component: HomeUkBlogEightySevenComponent },
];

@NgModule({
  declarations: [HomeUkBlogEightySevenComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class EightySevenUkBlogModule {}
