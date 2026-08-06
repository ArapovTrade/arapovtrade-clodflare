import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsychologiyaTreydingaComponent } from './psychologiya-treydinga.component';

describe('PsychologiyaTreydingaComponent', () => {
  let component: PsychologiyaTreydingaComponent;
  let fixture: ComponentFixture<PsychologiyaTreydingaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PsychologiyaTreydingaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PsychologiyaTreydingaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
