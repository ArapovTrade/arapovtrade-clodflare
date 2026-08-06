import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogSixtySixComponent } from './home-en-blog-sixty-six.component';

describe('HomeEnBlogSixtySixComponent', () => {
  let component: HomeEnBlogSixtySixComponent;
  let fixture: ComponentFixture<HomeEnBlogSixtySixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogSixtySixComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogSixtySixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
