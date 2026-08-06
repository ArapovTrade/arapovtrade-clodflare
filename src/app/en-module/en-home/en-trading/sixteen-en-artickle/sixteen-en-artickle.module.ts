import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnSixteenComponent } from './home-en-sixteen/home-en-sixteen.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeEnSixteenComponent }];
@NgModule({
  declarations: [HomeEnSixteenComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class SixteenEnArtickleModule {}
