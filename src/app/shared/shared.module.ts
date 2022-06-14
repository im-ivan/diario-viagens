import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';
import { MaterialModule } from './material.module';
import { HomeComponent } from './components/home/home.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    
    LoaderComponent,
    HomeComponent,
  ],
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [LoaderComponent],
})
export class SharedModule {}


