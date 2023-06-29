import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditPredmetPage } from './edit-predmet.page';

describe('EditPredmetPage', () => {
  let component: EditPredmetPage;
  let fixture: ComponentFixture<EditPredmetPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditPredmetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
