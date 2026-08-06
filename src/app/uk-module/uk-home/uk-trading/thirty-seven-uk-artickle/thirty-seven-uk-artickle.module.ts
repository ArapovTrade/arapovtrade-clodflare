import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkThirtySevenComponent } from './home-uk-thirty-seven/home-uk-thirty-seven.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeUkThirtySevenComponent }];
@NgModule({
  declarations: [HomeUkThirtySevenComponent],
 imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class ThirtySevenUkArtickleModule {}
