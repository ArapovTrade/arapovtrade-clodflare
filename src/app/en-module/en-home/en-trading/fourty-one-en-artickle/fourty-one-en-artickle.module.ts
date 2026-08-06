import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnFourtyOneComponent } from './home-en-fourty-one/home-en-fourty-one.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeEnFourtyOneComponent }];

@NgModule({
  declarations: [HomeEnFourtyOneComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class FourtyOneEnArtickleModule {}
