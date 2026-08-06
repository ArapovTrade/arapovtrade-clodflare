import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogTwentySixComponent } from './home-en-blog-twenty-six.component';

describe('HomeEnBlogTwentySixComponent', () => {
  let component: HomeEnBlogTwentySixComponent;
  let fixture: ComponentFixture<HomeEnBlogTwentySixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogTwentySixComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogTwentySixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
