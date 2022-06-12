import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TermosDeUsoComponent } from './core/components/termos-de-uso/termos-de-uso.component';
import { HomeComponent} from '../app/shared/components/home/home.component'

const routes: Routes = [
{path: 'termos-de-uso', component: TermosDeUsoComponent},
{path: 'home', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
