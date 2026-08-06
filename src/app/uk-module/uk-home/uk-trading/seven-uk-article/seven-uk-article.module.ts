import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkSevenComponent } from './home-uk-seven/home-uk-seven.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkSevenComponent }];

@NgModule({
  declarations: [HomeUkSevenComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class SevenUkArticleModule {}
