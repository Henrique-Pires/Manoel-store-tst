import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { StoreService } from '../../store.service';
import { StageEnum } from '../../enum/stage.enum';

@Component({
  selector: 'app-formulario-jogo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulario-jogo.component.html',
  styleUrl: './formulario-jogo.component.scss',
})
export class FormularioJogoComponent {
  @Output() setStage = new EventEmitter<number>();
  form: FormGroup;
  imageBase64: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder, private storeService: StoreService) {
    this.form = this.fb.group({
      nome: ['', [Validators.required]],
      preco: [null, [Validators.required]],
      altura: [null, [Validators.required]],
      largura: [null, [Validators.required]],
      comprimento: [null, [Validators.required]],
      desc: [''],
      imagem: ['', [Validators.required]],
    });
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.imageBase64 = reader.result;
        this.form.patchValue({ imagem: this.imageBase64 });
      };

      reader.readAsDataURL(file);
    }
  }
  onSubmit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
    } else {
      this.form.patchValue({ imagem: this.imageBase64 });
      this.imageBase64 = null;
      this.storeService.adicionarProduto(this.form.value);
      this.form.reset();
      this.setStage.emit(StageEnum.LISTAGEM)
    }
  }
}
