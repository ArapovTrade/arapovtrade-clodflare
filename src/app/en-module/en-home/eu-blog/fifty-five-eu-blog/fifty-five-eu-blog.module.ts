import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEuBlogFiftyFiveComponent } from './home-eu-blog-fifty-five/home-eu-blog-fifty-five.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEuBlogFiftyFiveComponent }];

@NgModule({
  declarations: [HomeEuBlogFiftyFiveComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class FiftyFiveEuBlogModule {}
