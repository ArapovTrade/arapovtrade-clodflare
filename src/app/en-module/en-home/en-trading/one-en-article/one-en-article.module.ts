import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeOneEnComponent } from './home-one-en/home-one-en.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeOneEnComponent }];

@NgModule({
  declarations: [HomeOneEnComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],

})
export class OneEnArticleModule {}
