import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Diario } from 'src/app/core/models/diario';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UploadService } from 'src/app/core/services/upload/upload.service';

@Component({
  selector: 'app-diario-edit',
  templateUrl: './diario-edit.component.html',
  styleUrls: ['./diario-edit.component.scss'],
})
export class DiarioEditComponent implements OnInit {
  diario: Diario = {} as Diario;
  imagens: File[] =[];
  nameSelected = "";
  listaLinks: any[] = [];
  corBtnImg = this.imagens.length > 0 ?'primary': 'warn';

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Diario, // objeto enviado no open {data: diario}
    private ref: MatDialogRef<DiarioEditComponent>,
    public uploadService : UploadService,
    public authService: AuthService
  ) {}

  imagem?: File;

  setImage(event: any) {
    
    console.log(event.target.files[0]);
    console.log(event);

    const selectedFiles = <FileList>event?.srcElement.files;
    const fileNames = [];
    this.listaLinks = [];

    for(let i = 0; i < selectedFiles.length; i++){
      this.getLinksImg(selectedFiles[i]);
      fileNames.push(selectedFiles[i].name);      
      console.log(selectedFiles[i])
      this.imagens.push(selectedFiles[i]);
      this.corBtnImg = this.imagens.length > 0 ?'primary': 'warn';
         
      console.log(this.imagens);
    }
   this.nameSelected = fileNames.join(', ');
  }

  onSubmit() {
    setTimeout(() => {
      this.ref.close({ diario: this.diario, imagem: this.listaLinks });
    }, 2000);
  }

  getLinksImg(imagem: File){
    this.uploadService.upload(imagem, `diarios/${this.authService.uid}/`).subscribe( res =>{
    this.listaLinks.push(res);
  })
}

  ngOnInit(): void {
    this.diario = this.data;
  }
}
