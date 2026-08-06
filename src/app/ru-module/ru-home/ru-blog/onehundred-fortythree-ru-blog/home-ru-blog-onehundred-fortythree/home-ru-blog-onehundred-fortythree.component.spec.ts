import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredFortythreeComponent } from './home-ru-blog-onehundred-fortythree.component';

describe('HomeRuBlogOnehundredFortythreeComponent', () => {
  let component: HomeRuBlogOnehundredFortythreeComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredFortythreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredFortythreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredFortythreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
