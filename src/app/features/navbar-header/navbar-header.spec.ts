import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarHeader } from './navbar-header';

describe('NavbarHeader', () => {
  let component: NavbarHeader;
  let fixture: ComponentFixture<NavbarHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
