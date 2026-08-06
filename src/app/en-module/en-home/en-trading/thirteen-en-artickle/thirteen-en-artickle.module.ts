import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnThirteenComponent } from './home-en-thirteen/home-en-thirteen.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeEnThirteenComponent }];

@NgModule({
  declarations: [HomeEnThirteenComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class ThirteenEnArtickleModule {}
