import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAniverComponent } from './dialog-aniver.component';

describe('DialogAniverComponent', () => {
  let component: DialogAniverComponent;
  let fixture: ComponentFixture<DialogAniverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAniverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAniverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
