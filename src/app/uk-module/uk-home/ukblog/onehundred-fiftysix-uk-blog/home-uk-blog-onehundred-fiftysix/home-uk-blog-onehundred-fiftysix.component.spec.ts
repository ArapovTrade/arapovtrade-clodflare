import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredFiftysixComponent } from './home-uk-blog-onehundred-fiftysix.component';

describe('HomeUkBlogOnehundredFiftysixComponent', () => {
  let component: HomeUkBlogOnehundredFiftysixComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredFiftysixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredFiftysixComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredFiftysixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
