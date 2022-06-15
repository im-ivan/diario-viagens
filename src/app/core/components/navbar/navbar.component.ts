import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, timeout } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { DialogAniverComponent } from '../dialog-aniver/dialog-aniver.component';
import * as moment from 'moment';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  usuarioLogado: any;
  public hoje = moment().format('DD-MM');

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private toast: HotToastService) {}

  logged$?: Observable<any>;
  logged: any;

  logout() {
    this.authService.logout('/login')
    .pipe(
      this.toast.observe({
        success: 'Volte sempre!',

      })
    )
    .subscribe();
  }

  muda(){
    var toolbar = document.getElementById("toolbar") as HTMLButtonElement
    var i = toolbar.getAttribute("class")

    if (i == "mat-toolbar mat-primary mat-toolbar-single-row") {
      toolbar.setAttribute("class", "mat-toolbar mat-accent mat-toolbar-single-row");
    }else{
      toolbar.setAttribute("class", "mat-toolbar mat-primary mat-toolbar-single-row");
    }
  }

  ngOnInit(): void {
    this.logged$ = this.authService.logged;
    this.authService.logged.subscribe
    (value =>{
      this.logged = value;
    })

    setTimeout(() => {
      this.getUsuarioLogado();
    }, 4000);
  }

  openDialog(dados: any) {
    const ref = this.dialog.open(DialogAniverComponent, {
      minWidth: '400px',
      data: dados
    })
  }

  openModalNiver(user: any) {
    var exibirModal = localStorage.getItem("exibir_modal");
    if (exibirModal == null) {
      localStorage.setItem("exibir_modal", "s");
      exibirModal = 's';
    }
    if ((user.dataNasc == this.hoje) && exibirModal === 's') {
      this.openDialog(user)
      exibirModal = 'n';
      localStorage.setItem("exibir_modal", "n");

    } else {
    }
  }

  getUsuarioLogado(){
    this.authService.getUsuario().subscribe(val =>{
      this.usuarioLogado = val;
      this.usuarioLogado.dataNasc = moment(this.usuarioLogado.dataNasc.toDate()).format("DD-MM");    
      this.openModalNiver(this.usuarioLogado);

    })
  }
}
