import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnFourtySixComponent } from './home-en-fourty-six/home-en-fourty-six.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeEnFourtySixComponent }];

@NgModule({
  declarations: [HomeEnFourtySixComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class FourtySixEnArtickleModule {}
