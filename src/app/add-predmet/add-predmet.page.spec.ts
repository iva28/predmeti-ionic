import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddPredmetPage } from './add-predmet.page';

describe('AddPredmetPage', () => {
  let component: AddPredmetPage;
  let fixture: ComponentFixture<AddPredmetPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddPredmetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
