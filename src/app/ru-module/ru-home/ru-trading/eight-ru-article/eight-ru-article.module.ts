import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuEightComponent } from './home-ru-eight/home-ru-eight.component';
import { Routes, RouterModule } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
const routes: Routes = [{ path: '', component: HomeRuEightComponent }];

@NgModule({
  declarations: [HomeRuEightComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class EightRuArticleModule {}
