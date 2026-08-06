import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuThreeComponent } from './home-ru-three/home-ru-three.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeRuThreeComponent }];

@NgModule({
  declarations: [HomeRuThreeComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class ThreeRuArticleModule {}
