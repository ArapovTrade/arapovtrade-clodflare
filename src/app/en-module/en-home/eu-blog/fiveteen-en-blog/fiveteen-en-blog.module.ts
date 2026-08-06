import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogFiveteenComponent } from './home-en-blog-fiveteen/home-en-blog-fiveteen.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogFiveteenComponent }];

@NgModule({
  declarations: [HomeEnBlogFiveteenComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class FiveteenEnBlogModule {}
