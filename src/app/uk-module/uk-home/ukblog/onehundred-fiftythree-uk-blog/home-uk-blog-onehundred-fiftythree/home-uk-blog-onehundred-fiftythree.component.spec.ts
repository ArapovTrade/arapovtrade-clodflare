import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredFiftythreeComponent } from './home-uk-blog-onehundred-fiftythree.component';

describe('HomeUkBlogOnehundredFiftythreeComponent', () => {
  let component: HomeUkBlogOnehundredFiftythreeComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredFiftythreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredFiftythreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredFiftythreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
