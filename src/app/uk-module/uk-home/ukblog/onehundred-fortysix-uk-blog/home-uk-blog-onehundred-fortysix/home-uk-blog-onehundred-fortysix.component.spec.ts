import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredFortysixComponent } from './home-uk-blog-onehundred-fortysix.component';

describe('HomeUkBlogOnehundredFortysixComponent', () => {
  let component: HomeUkBlogOnehundredFortysixComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredFortysixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredFortysixComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredFortysixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
