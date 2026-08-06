import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnThirtyComponent } from './home-en-thirty/home-en-thirty.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeEnThirtyComponent }];
@NgModule({
  declarations: [HomeEnThirtyComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],

})
export class ThirtyEnArtickleModule {}
