import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OlvidoContrasenaPage } from './olvido-contrasena.page';

describe('OlvidoContrasenaPage', () => {
  let component: OlvidoContrasenaPage;
  let fixture: ComponentFixture<OlvidoContrasenaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(OlvidoContrasenaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
