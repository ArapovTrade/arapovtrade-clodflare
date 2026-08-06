import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OsnovyTreydingaTomTwoUkComponent } from './osnovy-treydinga-tom-two-uk.component';

describe('OsnovyTreydingaTomTwoUkComponent', () => {
  let component: OsnovyTreydingaTomTwoUkComponent;
  let fixture: ComponentFixture<OsnovyTreydingaTomTwoUkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OsnovyTreydingaTomTwoUkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OsnovyTreydingaTomTwoUkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
