import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { Observable } from 'rxjs';
import { Diario } from 'src/app/core/models/diario';
import { DiariosService } from 'src/app/core/services/diarios/diarios.service';
import { DiarioAddComponent } from '../diario-add/diario-add.component';
import { DiarioDeleteComponent } from '../diario-delete/diario-delete.component';
import { DiarioEditComponent } from '../diario-edit/diario-edit.component';

@Component({
  selector: 'app-diario-list',
  templateUrl: './diario-list.component.html',
  styleUrls: ['./diario-list.component.scss'],
})
export class DiarioListComponent implements OnInit {
  allDiarios$?: Observable<Diario[]>;
  meusDiarios$?: Observable<Diario[]>;
  numeroDeColunas!: number;
  usuarioLogado?: any;

  constructor(
    private dialog: MatDialog,
    private diariosService: DiariosService,
    private toast: HotToastService
  ) { }

  onClickAdd() {

    const ref = this.dialog.open(DiarioAddComponent, { maxWidth: '512px' });

    ref.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.diariosService
            .addDiario(result.diario, result.imagem)
            .pipe(
              this.toast.observe({
                loading: 'Adicionando...',
                error: 'Ocorreu um erro',
                success: 'Diário adicionado',
              })
            )
            .subscribe();
        }
      },
    });
  }

  onClickEdit(diario: Diario) {

    const ref = this.dialog.open(DiarioEditComponent, {
      maxWidth: '512px',
      data: { ...diario },
    });
    ref.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.diariosService.edithDiario(result.diario, result.imagem)
            .pipe(
              this.toast.observe({
                loading: 'Atualizando...',
                error: 'Ocorreu um erro',
                success: 'Diário atualizado',
              })
            )
            .subscribe();
        }
      },
    });
  }

  onClickDelete(diario: Diario) {
    const ref = this.dialog.open(DiarioDeleteComponent, {
      minWidth: '400px',
      data: { ...diario },
    });
    ref.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.diariosService.deleteDiario(result.diario)
            .pipe(
              this.toast.observe({
                loading: 'Deletando...',
                error: 'Ocorreu um erro',
                success: 'Diário deletado',
              })
            )
            .subscribe();
        }
      },
    });
  }

  onResize(event: any) {
    this.numeroDeColunas = (event.target.innerWidth <= 900) ? 1 : 3;
  }

  ngOnInit(): void {
    this.allDiarios$ = this.diariosService.getTodosDiarios();
    this.meusDiarios$ = this.diariosService.getDiariosUsuario();
    this.numeroDeColunas = (window.innerWidth <= 900) ? 1 : 3;
  }
}
