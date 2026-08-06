import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnEightComponent } from './home-en-eight/home-en-eight.component';
import { Routes, RouterModule } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
const routes: Routes = [{ path: '', component: HomeEnEightComponent }];
@NgModule({
  declarations: [HomeEnEightComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class EightEnArticleModule {}
