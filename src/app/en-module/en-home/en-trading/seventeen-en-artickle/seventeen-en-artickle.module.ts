import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnSeventeenComponent } from './home-en-seventeen/home-en-seventeen.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeEnSeventeenComponent }];
@NgModule({
  declarations: [HomeEnSeventeenComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class SeventeenEnArtickleModule {}
