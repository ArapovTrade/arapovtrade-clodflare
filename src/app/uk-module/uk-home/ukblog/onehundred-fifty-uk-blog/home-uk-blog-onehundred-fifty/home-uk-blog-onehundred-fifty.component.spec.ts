import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredFiftyComponent } from './home-uk-blog-onehundred-fifty.component';

describe('HomeUkBlogOnehundredFiftyComponent', () => {
  let component: HomeUkBlogOnehundredFiftyComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredFiftyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredFiftyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredFiftyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
