import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorComponent } from './calculator.component';
import { PeopleMock } from '../mocks/peopleMock';
import { VenuesMock } from '../mocks/venuesMock';

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;
  const allPlacesNames = VenuesMock.map(place => place.name);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CalculatorComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create component', () => {
    expect(component).toBeTruthy();
  });

  it('Should reset best places', () => {
    component.reset();
    expect(component.bestPlaces)
      .toEqual(allPlacesNames);
  });

  it('Should show places for John', () => {
    component.selectedList.setValue([PeopleMock[0]]);
    component.calculate();
    expect(component.bestPlaces)
      .toEqual(allPlacesNames);
  });

  it('Should show places for John and Paulina', () => {
    component.selectedList.setValue([PeopleMock[0], PeopleMock[4]]);
    component.calculate();
    expect(component.bestPlaces)
      .toEqual(['El Cantina', 'The York', 'The Three Johns']);
  });

  it('Should show places for John, Paulina and Tony', () => {
    component.selectedList.setValue([PeopleMock[0], PeopleMock[4], PeopleMock[1]]);
    component.calculate();
    expect(component.bestPlaces)
      .toEqual([]);
  });
});
