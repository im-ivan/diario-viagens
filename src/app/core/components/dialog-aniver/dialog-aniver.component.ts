import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-dialog-aniver',
  templateUrl: './dialog-aniver.component.html',
  styleUrls: ['./dialog-aniver.component.scss']
})
export class DialogAniverComponent implements OnInit {

  constructor(
    private authService: AuthService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public dados: any
    ) {
  }

  ngOnInit(): void {
    console.log(this.dados)
  }
}
