import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Diario } from 'src/app/core/models/diario';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UploadService } from 'src/app/core/services/upload/upload.service';

@Component({
  selector: 'app-diario-add',
  templateUrl: './diario-add.component.html',
  styleUrls: ['./diario-add.component.scss'],
})
export class DiarioAddComponent implements OnInit {
  diario: Diario = {} as Diario;
  imagens: File[] = [];
  nameSelected = "";
  listaLinks: any[] = [];
  corBtnImg = this.imagens.length > 0 ?'primary': 'warn';
  
  setImage(event: any) {

    console.log(event.target.files[0]);
    console.log(event);

    const selectedFiles = <FileList>event?.srcElement.files;
    const fileNames = [];
    this.listaLinks = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      this.getLinksImg(selectedFiles[i]);
      fileNames.push(selectedFiles[i].name);
      console.log(selectedFiles[i])
      this.imagens.push(selectedFiles[i]);
      this.corBtnImg = this.imagens.length > 0 ?'primary': 'warn';

      console.log(fileNames);
    }
    this.nameSelected = fileNames.join(', ');
  }

  constructor(
    private authService: AuthService,
    private ref: MatDialogRef<DiarioAddComponent>,
    public uploadService : UploadService,
  ) { }

  onSubmit() {
    setTimeout(() => {
      this.ref.close({ diario: this.diario, imagem: this.listaLinks });
    }, 2000);
  }

  ngOnInit(): void { }

  getLinksImg(imagem: File) {

    this.uploadService.upload(imagem, `diarios/${this.authService.uid}/`).subscribe(res => {
      this.listaLinks.push(res);
    })
  }
}
