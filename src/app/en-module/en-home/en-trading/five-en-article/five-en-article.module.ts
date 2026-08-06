import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeFiveEnComponent } from './home-five-en/home-five-en.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeFiveEnComponent }];

@NgModule({
  declarations: [HomeFiveEnComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class FiveEnArticleModule {}
