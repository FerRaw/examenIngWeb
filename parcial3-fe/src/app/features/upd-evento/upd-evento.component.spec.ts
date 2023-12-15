import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdEventoComponent } from './upd-evento.component';

describe('UpdEventoComponent', () => {
  let component: UpdEventoComponent;
  let fixture: ComponentFixture<UpdEventoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdEventoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
