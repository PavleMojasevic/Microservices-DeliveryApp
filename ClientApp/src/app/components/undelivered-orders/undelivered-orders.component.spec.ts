import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UndeliveredOrdersComponent } from './undelivered-orders.component';

describe('UndeliveredOrdersComponent', () => {
  let component: UndeliveredOrdersComponent;
  let fixture: ComponentFixture<UndeliveredOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UndeliveredOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UndeliveredOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
