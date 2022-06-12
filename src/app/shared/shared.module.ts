import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';
import { MaterialModule } from './material.module';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    
    LoaderComponent,
    HomeComponent,
  ],
  imports: [CommonModule, MaterialModule],
  exports: [LoaderComponent],
})
export class SharedModule {}


