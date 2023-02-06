import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderHistoryDelivererComponent } from './order-history-deliverer.component';

describe('OrderHistoryDelivererComponent', () => {
  let component: OrderHistoryDelivererComponent;
  let fixture: ComponentFixture<OrderHistoryDelivererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderHistoryDelivererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderHistoryDelivererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
