import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogSeventeenComponent } from './home-uk-blog-seventeen.component';

describe('HomeUkBlogSeventeenComponent', () => {
  let component: HomeUkBlogSeventeenComponent;
  let fixture: ComponentFixture<HomeUkBlogSeventeenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogSeventeenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogSeventeenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
