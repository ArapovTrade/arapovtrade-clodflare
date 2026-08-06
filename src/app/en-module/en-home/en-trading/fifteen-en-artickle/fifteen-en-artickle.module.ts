import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnFifteenComponent } from './home-en-fifteen/home-en-fifteen.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeEnFifteenComponent }];

@NgModule({
  declarations: [HomeEnFifteenComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class FifteenEnArtickleModule {}
