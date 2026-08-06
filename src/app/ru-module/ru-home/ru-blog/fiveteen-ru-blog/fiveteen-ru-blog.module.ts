import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogFiveteenComponent } from './home-ru-blog-fiveteen/home-ru-blog-fiveteen.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogFiveteenComponent }];

@NgModule({
  declarations: [HomeRuBlogFiveteenComponent],
 imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class FiveteenRuBlogModule {}
