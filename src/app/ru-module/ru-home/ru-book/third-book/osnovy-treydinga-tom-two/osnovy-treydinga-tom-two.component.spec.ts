import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OsnovyTreydingaTomTwoComponent } from './osnovy-treydinga-tom-two.component';

describe('OsnovyTreydingaTomTwoComponent', () => {
  let component: OsnovyTreydingaTomTwoComponent;
  let fixture: ComponentFixture<OsnovyTreydingaTomTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OsnovyTreydingaTomTwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OsnovyTreydingaTomTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
