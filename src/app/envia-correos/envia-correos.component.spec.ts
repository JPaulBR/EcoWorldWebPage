import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnviaCorreosComponent } from './envia-correos.component';

describe('EnviaCorreosComponent', () => {
  let component: EnviaCorreosComponent;
  let fixture: ComponentFixture<EnviaCorreosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnviaCorreosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnviaCorreosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
