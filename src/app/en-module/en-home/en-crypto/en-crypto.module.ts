import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnCryptoHomepageComponent } from './en-crypto-homepage/en-crypto-homepage.component';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: EnCryptoHomepageComponent }];

@NgModule({
  declarations: [EnCryptoHomepageComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class EnCryptoModule {}
