import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogNintySixComponent } from './home-en-blog-ninty-six/home-en-blog-ninty-six.component';
import { MatExpansionModule } from '@angular/material/expansion';


import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogNintySixComponent }];

@NgModule({
  declarations: [HomeEnBlogNintySixComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class NintySixEnBlogModule { }
