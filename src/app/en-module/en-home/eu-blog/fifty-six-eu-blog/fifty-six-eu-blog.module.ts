import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEuBlogFiftySixComponent } from './home-eu-blog-fifty-six/home-eu-blog-fifty-six.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEuBlogFiftySixComponent }];

@NgModule({
  declarations: [HomeEuBlogFiftySixComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class FiftySixEuBlogModule {}
