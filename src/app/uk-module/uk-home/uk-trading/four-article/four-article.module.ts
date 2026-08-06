import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { HomeUkFourComponent } from './home-uk-four/home-uk-four.component';

const routes: Routes = [{ path: '', component: HomeUkFourComponent }];

@NgModule({
  declarations: [HomeUkFourComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class FourArticleModule {}
