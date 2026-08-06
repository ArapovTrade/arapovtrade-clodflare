import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnThirtySevenComponent } from './home-en-thirty-seven/home-en-thirty-seven.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeEnThirtySevenComponent }];
@NgModule({
  declarations: [HomeEnThirtySevenComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class ThirtySevenEnArtickleModule {}
