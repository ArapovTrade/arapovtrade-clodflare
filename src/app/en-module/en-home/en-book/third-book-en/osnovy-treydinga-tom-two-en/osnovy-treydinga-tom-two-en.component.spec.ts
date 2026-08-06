import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OsnovyTreydingaTomTwoEnComponent } from './osnovy-treydinga-tom-two-en.component';

describe('OsnovyTreydingaTomTwoEnComponent', () => {
  let component: OsnovyTreydingaTomTwoEnComponent;
  let fixture: ComponentFixture<OsnovyTreydingaTomTwoEnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OsnovyTreydingaTomTwoEnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OsnovyTreydingaTomTwoEnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
