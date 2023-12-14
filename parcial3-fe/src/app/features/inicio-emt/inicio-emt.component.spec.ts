import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioEmtComponent } from './inicio-emt.component';

describe('InicioEmtComponent', () => {
  let component: InicioEmtComponent;
  let fixture: ComponentFixture<InicioEmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InicioEmtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InicioEmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
