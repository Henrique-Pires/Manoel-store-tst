import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioJogoComponent } from './formulario-jogo.component';

describe('FormularioJogoComponent', () => {
  let component: FormularioJogoComponent;
  let fixture: ComponentFixture<FormularioJogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioJogoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioJogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
