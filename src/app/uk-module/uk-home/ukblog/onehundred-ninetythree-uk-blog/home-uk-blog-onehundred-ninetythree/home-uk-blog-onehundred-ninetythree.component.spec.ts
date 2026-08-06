import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredNinetythreeComponent } from './home-uk-blog-onehundred-ninetythree.component';

describe('HomeUkBlogOnehundredNinetythreeComponent', () => {
  let component: HomeUkBlogOnehundredNinetythreeComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredNinetythreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredNinetythreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredNinetythreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
