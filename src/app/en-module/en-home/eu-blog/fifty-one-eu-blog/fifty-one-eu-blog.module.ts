import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEuBlogFiftyOneComponent } from './home-eu-blog-fifty-one/home-eu-blog-fifty-one.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEuBlogFiftyOneComponent }];

@NgModule({
  declarations: [HomeEuBlogFiftyOneComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class FiftyOneEuBlogModule {}
