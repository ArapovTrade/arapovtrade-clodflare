import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkThirtyFiveComponent } from './home-uk-thirty-five/home-uk-thirty-five.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeUkThirtyFiveComponent }];
@NgModule({
  declarations: [HomeUkThirtyFiveComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class ThirtyFiveUkArtickleModule {}
