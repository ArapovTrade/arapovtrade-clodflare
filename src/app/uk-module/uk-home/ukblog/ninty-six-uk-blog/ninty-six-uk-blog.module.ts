import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogNintySixComponent } from './home-uk-blog-ninty-six/home-uk-blog-ninty-six.component';


import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogNintySixComponent }];

@NgModule({
  declarations: [HomeUkBlogNintySixComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class NintySixUkBlogModule { }
