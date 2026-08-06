import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogFiftySixComponent } from './home-ru-blog-fifty-six/home-ru-blog-fifty-six.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogFiftySixComponent }];

@NgModule({
  declarations: [HomeRuBlogFiftySixComponent],
 imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class FiftySixRuBlogModule {}
