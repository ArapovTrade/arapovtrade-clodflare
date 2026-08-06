import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogFiftySixComponent } from './home-uk-blog-fifty-six.component';

describe('HomeUkBlogFiftySixComponent', () => {
  let component: HomeUkBlogFiftySixComponent;
  let fixture: ComponentFixture<HomeUkBlogFiftySixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogFiftySixComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogFiftySixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
