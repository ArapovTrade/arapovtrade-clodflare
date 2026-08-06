import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OsnovyTreydingaComponent } from './osnovy-treydinga.component';

describe('OsnovyTreydingaComponent', () => {
  let component: OsnovyTreydingaComponent;
  let fixture: ComponentFixture<OsnovyTreydingaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OsnovyTreydingaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OsnovyTreydingaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
