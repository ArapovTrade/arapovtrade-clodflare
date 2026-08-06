import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredFortysixComponent } from './home-ru-blog-onehundred-fortysix.component';

describe('HomeRuBlogOnehundredFortysixComponent', () => {
  let component: HomeRuBlogOnehundredFortysixComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredFortysixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredFortysixComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredFortysixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
