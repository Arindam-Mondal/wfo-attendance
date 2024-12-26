import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GsiButtonComponent } from './gsi-button.component';

describe('GsiButtonComponent', () => {
  let component: GsiButtonComponent;
  let fixture: ComponentFixture<GsiButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GsiButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GsiButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
