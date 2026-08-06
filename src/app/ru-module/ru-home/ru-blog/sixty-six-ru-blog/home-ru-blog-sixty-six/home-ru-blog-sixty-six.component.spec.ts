import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogSixtySixComponent } from './home-ru-blog-sixty-six.component';

describe('HomeRuBlogSixtySixComponent', () => {
  let component: HomeRuBlogSixtySixComponent;
  let fixture: ComponentFixture<HomeRuBlogSixtySixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogSixtySixComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogSixtySixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
