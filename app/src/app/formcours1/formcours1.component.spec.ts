import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Formcours1Component } from './formcours1.component';

describe('Formcours1Component', () => {
  let component: Formcours1Component;
  let fixture: ComponentFixture<Formcours1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Formcours1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Formcours1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
