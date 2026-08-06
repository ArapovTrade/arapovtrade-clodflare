import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogFourtySixComponent } from './home-uk-blog-fourty-six/home-uk-blog-fourty-six.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogFourtySixComponent }];

@NgModule({
  declarations: [HomeUkBlogFourtySixComponent],
 imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class FourtySixUkBlogModule {}
