import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredSixtysixComponent } from './home-en-blog-onehundred-sixtysix.component';

describe('HomeEnBlogOnehundredSixtysixComponent', () => {
  let component: HomeEnBlogOnehundredSixtysixComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredSixtysixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredSixtysixComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredSixtysixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
