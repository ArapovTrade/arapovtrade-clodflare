import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogSixtySixComponent } from './home-uk-blog-sixty-six.component';

describe('HomeUkBlogSixtySixComponent', () => {
  let component: HomeUkBlogSixtySixComponent;
  let fixture: ComponentFixture<HomeUkBlogSixtySixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogSixtySixComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogSixtySixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
