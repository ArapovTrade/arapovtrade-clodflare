import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OsnovyTreydingaEnComponent } from './osnovy-treydinga-en.component';

describe('OsnovyTreydingaEnComponent', () => {
  let component: OsnovyTreydingaEnComponent;
  let fixture: ComponentFixture<OsnovyTreydingaEnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OsnovyTreydingaEnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OsnovyTreydingaEnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
