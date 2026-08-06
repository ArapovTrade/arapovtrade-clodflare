import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredFiftyoneComponent } from './home-ru-blog-onehundred-fiftyone/home-ru-blog-onehundred-fiftyone.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredFiftyoneComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredFiftyoneComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredFiftyoneRuBlogModule { }
