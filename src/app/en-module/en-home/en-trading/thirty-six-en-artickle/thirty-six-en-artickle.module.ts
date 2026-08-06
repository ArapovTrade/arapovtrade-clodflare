import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnThirtySixComponent } from './home-en-thirty-six/home-en-thirty-six.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeEnThirtySixComponent }];
@NgModule({
  declarations: [HomeEnThirtySixComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class ThirtySixEnArtickleModule {}
