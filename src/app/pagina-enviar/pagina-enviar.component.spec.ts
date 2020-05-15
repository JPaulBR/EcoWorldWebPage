import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaEnviarComponent } from './pagina-enviar.component';

describe('PaginaEnviarComponent', () => {
  let component: PaginaEnviarComponent;
  let fixture: ComponentFixture<PaginaEnviarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaEnviarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaEnviarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
