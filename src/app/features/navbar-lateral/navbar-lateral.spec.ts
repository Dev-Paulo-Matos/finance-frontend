import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarLateral } from './navbar-lateral';

describe('NavbarLateral', () => {
  let component: NavbarLateral;
  let fixture: ComponentFixture<NavbarLateral>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarLateral]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarLateral);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
