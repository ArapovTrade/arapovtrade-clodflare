import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogNintySixComponent } from './home-uk-blog-ninty-six.component';

describe('HomeUkBlogNintySixComponent', () => {
  let component: HomeUkBlogNintySixComponent;
  let fixture: ComponentFixture<HomeUkBlogNintySixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogNintySixComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogNintySixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
