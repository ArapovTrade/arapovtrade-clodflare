import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsychologiyaTreydingaUkComponent } from './psychologiya-treydinga-uk.component';

describe('PsychologiyaTreydingaUkComponent', () => {
  let component: PsychologiyaTreydingaUkComponent;
  let fixture: ComponentFixture<PsychologiyaTreydingaUkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PsychologiyaTreydingaUkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PsychologiyaTreydingaUkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
