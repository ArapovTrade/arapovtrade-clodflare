import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnTenComponent } from './home-en-ten/home-en-ten.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeEnTenComponent }];

@NgModule({
  declarations: [HomeEnTenComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class TenEnArtickleModule {}
