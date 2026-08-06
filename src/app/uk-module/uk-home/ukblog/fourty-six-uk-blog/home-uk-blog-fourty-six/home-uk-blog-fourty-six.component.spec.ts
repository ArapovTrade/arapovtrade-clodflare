import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogFourtySixComponent } from './home-uk-blog-fourty-six.component';

describe('HomeUkBlogFourtySixComponent', () => {
  let component: HomeUkBlogFourtySixComponent;
  let fixture: ComponentFixture<HomeUkBlogFourtySixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogFourtySixComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogFourtySixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
