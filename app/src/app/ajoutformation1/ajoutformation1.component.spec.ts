import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ajoutformation1Component } from './ajoutformation1.component';

describe('Ajoutformation1Component', () => {
  let component: Ajoutformation1Component;
  let fixture: ComponentFixture<Ajoutformation1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Ajoutformation1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Ajoutformation1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
