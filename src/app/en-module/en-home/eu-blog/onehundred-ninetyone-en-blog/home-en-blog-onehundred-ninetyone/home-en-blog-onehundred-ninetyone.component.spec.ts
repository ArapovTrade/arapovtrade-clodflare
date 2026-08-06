import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredNinetyoneComponent } from './home-en-blog-onehundred-ninetyone.component';

describe('HomeEnBlogOnehundredNinetyoneComponent', () => {
  let component: HomeEnBlogOnehundredNinetyoneComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredNinetyoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredNinetyoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredNinetyoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
