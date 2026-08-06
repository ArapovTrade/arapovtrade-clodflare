import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredNinetysevenComponent } from './home-uk-blog-onehundred-ninetyseven.component';

describe('HomeUkBlogOnehundredNinetysevenComponent', () => {
  let component: HomeUkBlogOnehundredNinetysevenComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredNinetysevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredNinetysevenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredNinetysevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
