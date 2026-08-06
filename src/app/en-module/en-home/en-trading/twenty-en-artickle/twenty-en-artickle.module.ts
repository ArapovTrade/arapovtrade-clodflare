import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnTwentyComponent } from './home-en-twenty/home-en-twenty.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeEnTwentyComponent }];
@NgModule({
  declarations: [HomeEnTwentyComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class TwentyEnArtickleModule {}
