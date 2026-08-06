import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogFiftyComponent } from './home-en-blog-fifty/home-en-blog-fifty.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogFiftyComponent }];

@NgModule({
  declarations: [HomeEnBlogFiftyComponent],
 imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class FiftyEnBlogModule {}
