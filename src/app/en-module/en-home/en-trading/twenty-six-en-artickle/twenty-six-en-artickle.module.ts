import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnTwentySixComponent } from './home-en-twenty-six/home-en-twenty-six.component';
  import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeEnTwentySixComponent }];
@NgModule({
  declarations: [HomeEnTwentySixComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class TwentySixEnArtickleModule {}
