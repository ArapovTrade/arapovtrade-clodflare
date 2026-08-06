import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkNineComponent } from './home-uk-nine/home-uk-nine.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeUkNineComponent }];

@NgModule({
  declarations: [HomeUkNineComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class NineUkArtickleModule {}
