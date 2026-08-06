import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnFourtyFourComponent } from './home-en-fourty-four/home-en-fourty-four.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeEnFourtyFourComponent }];

@NgModule({
  declarations: [HomeEnFourtyFourComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class FourtyFourEnArtickleModule {}
