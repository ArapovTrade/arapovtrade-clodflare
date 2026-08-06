import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogSeventySixComponent } from './home-uk-blog-seventy-six.component';

describe('HomeUkBlogSeventySixComponent', () => {
  let component: HomeUkBlogSeventySixComponent;
  let fixture: ComponentFixture<HomeUkBlogSeventySixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogSeventySixComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogSeventySixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
