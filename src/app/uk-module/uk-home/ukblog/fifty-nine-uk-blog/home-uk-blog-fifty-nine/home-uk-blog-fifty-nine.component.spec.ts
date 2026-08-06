import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogFiftyNineComponent } from './home-uk-blog-fifty-nine.component';

describe('HomeUkBlogFiftyNineComponent', () => {
  let component: HomeUkBlogFiftyNineComponent;
  let fixture: ComponentFixture<HomeUkBlogFiftyNineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogFiftyNineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogFiftyNineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
