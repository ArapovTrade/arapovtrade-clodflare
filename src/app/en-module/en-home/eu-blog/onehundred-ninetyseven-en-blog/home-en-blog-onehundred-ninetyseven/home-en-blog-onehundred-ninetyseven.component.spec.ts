import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredNinetysevenComponent } from './home-en-blog-onehundred-ninetyseven.component';

describe('HomeEnBlogOnehundredNinetysevenComponent', () => {
  let component: HomeEnBlogOnehundredNinetysevenComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredNinetysevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredNinetysevenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredNinetysevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
