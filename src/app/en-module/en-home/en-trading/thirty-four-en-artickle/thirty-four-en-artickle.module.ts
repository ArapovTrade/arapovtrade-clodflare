import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnThirtyFourComponent } from './home-en-thirty-four/home-en-thirty-four.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeEnThirtyFourComponent }];
@NgModule({
  declarations: [HomeEnThirtyFourComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class ThirtyFourEnArtickleModule {}
