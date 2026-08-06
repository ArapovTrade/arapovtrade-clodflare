import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsychologiyaTreydingaEnComponent } from './psychologiya-treydinga-en.component';

describe('PsychologiyaTreydingaEnComponent', () => {
  let component: PsychologiyaTreydingaEnComponent;
  let fixture: ComponentFixture<PsychologiyaTreydingaEnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PsychologiyaTreydingaEnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PsychologiyaTreydingaEnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
