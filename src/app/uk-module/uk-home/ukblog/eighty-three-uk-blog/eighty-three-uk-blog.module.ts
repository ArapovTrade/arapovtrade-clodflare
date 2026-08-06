import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogEightyThreeComponent } from './home-uk-blog-eighty-three/home-uk-blog-eighty-three.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  { path: '', component: HomeUkBlogEightyThreeComponent },
];

@NgModule({
  declarations: [HomeUkBlogEightyThreeComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class EightyThreeUkBlogModule {}
