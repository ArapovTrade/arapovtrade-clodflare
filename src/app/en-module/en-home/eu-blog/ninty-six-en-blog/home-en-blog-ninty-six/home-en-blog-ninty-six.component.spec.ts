import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogNintySixComponent } from './home-en-blog-ninty-six.component';

describe('HomeEnBlogNintySixComponent', () => {
  let component: HomeEnBlogNintySixComponent;
  let fixture: ComponentFixture<HomeEnBlogNintySixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogNintySixComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogNintySixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
