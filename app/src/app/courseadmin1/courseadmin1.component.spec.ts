import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Courseadmin1Component } from './courseadmin1.component';

describe('Courseadmin1Component', () => {
  let component: Courseadmin1Component;
  let fixture: ComponentFixture<Courseadmin1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Courseadmin1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Courseadmin1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
