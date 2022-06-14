import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MaterialModule } from '../shared/material.module';
import { RouterModule } from '@angular/router';
import { TermosDeUsoComponent } from './components/termos-de-uso/termos-de-uso.component';
import { DialogAniverComponent } from './components/dialog-aniver/dialog-aniver.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    NavbarComponent,
    TermosDeUsoComponent,
    DialogAniverComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule, 
  ],
  exports: [ 
    NavbarComponent, 
    DialogAniverComponent,
    FooterComponent
  ],
})
export class CoreModule {}


