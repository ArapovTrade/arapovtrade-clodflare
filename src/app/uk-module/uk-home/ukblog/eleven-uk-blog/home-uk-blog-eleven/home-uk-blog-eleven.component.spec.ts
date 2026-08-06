import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogElevenComponent } from './home-uk-blog-eleven.component';

describe('HomeUkBlogElevenComponent', () => {
  let component: HomeUkBlogElevenComponent;
  let fixture: ComponentFixture<HomeUkBlogElevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogElevenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogElevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
