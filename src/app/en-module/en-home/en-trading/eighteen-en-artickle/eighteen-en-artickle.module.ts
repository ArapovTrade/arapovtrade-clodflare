import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnEighteenComponent } from './home-en-eighteen/home-en-eighteen.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeEnEighteenComponent }];
@NgModule({
  declarations: [HomeEnEighteenComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class EighteenEnArtickleModule {}
