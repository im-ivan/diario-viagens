import { Injectable } from '@angular/core';
import { Storage } from '@angular/fire/storage';
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage';
import { from, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(private storage: Storage) { }

  private createFileName(file: File): string {
    const ext = file.name.split('.').pop();
    const name = `${Date.now()}${Math.floor(Math.random() * 1000)}`;
    return `${name}.${ext}`;
  }

  uploadList(file: File[], folder?: string): Observable<string[]> {
    const linksImagens: string[] = [];
    return of(file.flatMap((item) => {
      this.upload(item, folder).subscribe(res => {
        if (res != null) {
          linksImagens.push(res)
        }
      })
      return linksImagens;
    }))
  }

  upload(file: File, folder?: string): Observable<string> {
    const filename = this.createFileName(file);
    const fileRef = ref(this.storage, folder + filename);
    return from(uploadBytes(fileRef, file)).pipe(
      switchMap(() => from(getDownloadURL(fileRef)))
    );
  }
}
