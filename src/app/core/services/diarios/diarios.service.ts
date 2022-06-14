import { Injectable } from '@angular/core';
import {
  collectionData,
  docData,
  Firestore,
  where,
} from '@angular/fire/firestore';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  query,
  updateDoc,
} from '@firebase/firestore';
import { first, from, Observable, switchMap } from 'rxjs';
import { Diario, DiarioConverter } from '../../models/diario';
import { AuthService } from '../auth/auth.service';
import { UploadService } from '../upload/upload.service';

@Injectable({
  providedIn: 'root',
})
export class DiariosService {

  public imagemPadrao: string[] = ["assets/img/placeholder.png"];
  constructor(
    private db: Firestore,
    private authService: AuthService,
    private uploadService: UploadService
  ) { }

  diarios = collection(this.db, 'diarios').withConverter(DiarioConverter);

  getTodosDiarios(): Observable<Diario[]> {
    return collectionData(this.diarios, { idField: 'id' });
  }

  getDiariosUsuario(): Observable<Diario[]> {
    return this.authService.logged.pipe(
      first(),
      switchMap((user) => {
        return collectionData(
          query(this.diarios, where('usuarioId', '==', user?.uid)),
          { idField: 'id' }
        );
      })
    );
  }

  getDiarioById(id: string): Observable<Diario> {
    const diarioDoc = doc(this.diarios, id);
    return docData(diarioDoc, { idField: 'id' });
  }

  addDiario(diario: Diario, links: string[]) {
    return this.authService.userData.pipe(
      switchMap((user) => {
        console.log(JSON.stringify(user));
        diario.createdAt = new Date();
        diario.imagem = links ?? this.imagemPadrao;
        diario.usuarioId = this.authService.uid;
        diario.usuarioNick = user['nick'];
        diario.usuarioName = user['nome'];
        return from(addDoc(this.diarios, diario));
      })
    );
  }

  edithDiario(diario: Diario, links: string[]) {
    const diarioDoc = doc(this.diarios, diario.id);
   
          return from(//emite uma info vazia
            updateDoc(diarioDoc, {
              ...diario, imagem: links ?? diario.imagem
            })
          );
  }

  deleteDiario(diario: Diario) {
    const diarioDoc = doc(this.diarios, diario.id);
    return from(deleteDoc(diarioDoc));
  }
}

