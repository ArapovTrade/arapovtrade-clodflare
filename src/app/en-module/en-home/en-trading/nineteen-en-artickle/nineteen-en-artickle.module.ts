import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnNineteenComponent } from './home-en-nineteen/home-en-nineteen.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeEnNineteenComponent }];
@NgModule({
  declarations: [HomeEnNineteenComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class NineteenEnArtickleModule {}
