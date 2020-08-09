import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoombarComponent } from './roombar.component';

describe('RoombarComponent', () => {
  let component: RoombarComponent;
  let fixture: ComponentFixture<RoombarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoombarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoombarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
