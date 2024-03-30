import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleAuthenticatedComponent } from './module-authenticated.component';

describe('ModuleAuthenticatedComponent', () => {
  let component: ModuleAuthenticatedComponent;
  let fixture: ComponentFixture<ModuleAuthenticatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuleAuthenticatedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuleAuthenticatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
