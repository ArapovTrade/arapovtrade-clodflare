import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OsnovyTreydingaUkComponent } from './osnovy-treydinga-uk.component';

describe('OsnovyTreydingaUkComponent', () => {
  let component: OsnovyTreydingaUkComponent;
  let fixture: ComponentFixture<OsnovyTreydingaUkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OsnovyTreydingaUkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OsnovyTreydingaUkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
