import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
})
export class CadastroComponent implements OnInit {
  signupForm = this.fb.group(
    {
      nome: ['', [Validators.required]],
      nick: ['', [Validators.required]],
      dataNasc: [new Date(), [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(8)]],
      confirma_senha: [''],
      recaptcha: ['', Validators.required],
    },
    { validators: [this.matchPasswords] }
  );

  siteKey:string;

  matchPasswords(control: AbstractControl): ValidationErrors | null {
    return control.get('senha')!.value !== control.get('confirma_senha')!.value
      ? { matchPasswords: true }
      : null;
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toast: HotToastService
  ) {
    this.siteKey = "6LcWDVQgAAAAAHAuEbe4_6TGThVh4gH8ZinIZ5sj";
  }

  onSubmit() {
    const { email, senha, nick, nome, dataNasc } = this.signupForm.value;
    this.authService
      .signupEmail(email, senha, nome, nick, dataNasc)
      .pipe(
        this.toast.observe({
          success: 'Usuário criado com sucesso',
          error: 'Um erro ocorreu',
          loading: 'Criando usuário...',
        })
      )
      .subscribe();
  }

  ngOnInit(): void {}
}
