import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TarrifProfileComponent } from './tarrif-profile.component';

describe('TarrifProfileComponent', () => {
  let component: TarrifProfileComponent;
  let fixture: ComponentFixture<TarrifProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TarrifProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TarrifProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
