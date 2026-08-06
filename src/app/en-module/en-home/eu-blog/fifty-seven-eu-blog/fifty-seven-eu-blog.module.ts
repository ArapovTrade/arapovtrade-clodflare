import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEuBlogFiftySevenComponent } from './home-eu-blog-fifty-seven/home-eu-blog-fifty-seven.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEuBlogFiftySevenComponent }];

@NgModule({
  declarations: [HomeEuBlogFiftySevenComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class FiftySevenEuBlogModule {}
