import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredFiftysixComponent } from './home-en-blog-onehundred-fiftysix.component';

describe('HomeEnBlogOnehundredFiftysixComponent', () => {
  let component: HomeEnBlogOnehundredFiftysixComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredFiftysixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredFiftysixComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredFiftysixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
