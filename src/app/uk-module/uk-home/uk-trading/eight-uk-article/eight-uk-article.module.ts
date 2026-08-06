import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkEightComponent } from './home-uk-eight/home-uk-eight.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeUkEightComponent }];

@NgModule({
  declarations: [HomeUkEightComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class EightUkArticleModule {}
