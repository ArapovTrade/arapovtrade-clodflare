import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogFiveteenComponent } from './home-uk-blog-fiveteen/home-uk-blog-fiveteen.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogFiveteenComponent }];

@NgModule({
  declarations: [HomeUkBlogFiveteenComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class FiveteenUkBlogModule {}
