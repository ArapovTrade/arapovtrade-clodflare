import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredFortysixComponent } from './home-en-blog-onehundred-fortysix.component';

describe('HomeEnBlogOnehundredFortysixComponent', () => {
  let component: HomeEnBlogOnehundredFortysixComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredFortysixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredFortysixComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredFortysixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
