import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnNineComponent } from './home-en-nine/home-en-nine.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeEnNineComponent }];

@NgModule({
  declarations: [HomeEnNineComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class NineEnArtickleModule {}
