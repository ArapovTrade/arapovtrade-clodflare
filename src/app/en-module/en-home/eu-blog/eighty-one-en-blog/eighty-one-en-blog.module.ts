import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogEightyOneComponent } from './home-en-blog-eighty-one/home-en-blog-eighty-one.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogEightyOneComponent }];

@NgModule({
  declarations: [HomeEnBlogEightyOneComponent],
 imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class EightyOneEnBlogModule {}
