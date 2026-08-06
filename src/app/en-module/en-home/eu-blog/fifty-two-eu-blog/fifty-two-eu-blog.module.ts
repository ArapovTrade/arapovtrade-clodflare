import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEuBlogFiftyTwoComponent } from './home-eu-blog-fifty-two/home-eu-blog-fifty-two.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEuBlogFiftyTwoComponent }];

@NgModule({
  declarations: [HomeEuBlogFiftyTwoComponent],
 imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class FiftyTwoEuBlogModule {}
