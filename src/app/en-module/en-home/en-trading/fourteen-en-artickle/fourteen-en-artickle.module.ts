import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnFourteenComponent } from './home-en-fourteen/home-en-fourteen.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeEnFourteenComponent }];

@NgModule({
  declarations: [HomeEnFourteenComponent],
 imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class FourteenEnArtickleModule {}
