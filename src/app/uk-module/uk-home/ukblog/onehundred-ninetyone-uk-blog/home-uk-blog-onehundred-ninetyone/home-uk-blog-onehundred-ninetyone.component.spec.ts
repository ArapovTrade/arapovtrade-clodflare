import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredNinetyoneComponent } from './home-uk-blog-onehundred-ninetyone.component';

describe('HomeUkBlogOnehundredNinetyoneComponent', () => {
  let component: HomeUkBlogOnehundredNinetyoneComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredNinetyoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredNinetyoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredNinetyoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
