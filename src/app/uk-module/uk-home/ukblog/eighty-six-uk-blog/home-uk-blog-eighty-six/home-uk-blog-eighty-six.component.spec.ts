import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogEightySixComponent } from './home-uk-blog-eighty-six.component';

describe('HomeUkBlogEightySixComponent', () => {
  let component: HomeUkBlogEightySixComponent;
  let fixture: ComponentFixture<HomeUkBlogEightySixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogEightySixComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogEightySixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
