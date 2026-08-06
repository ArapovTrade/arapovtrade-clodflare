import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredEightyoneComponent } from './home-ru-blog-onehundred-eightyone/home-ru-blog-onehundred-eightyone.component';



import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredEightyoneComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredEightyoneComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OnehundredEightyoneRuBlogModule { }
