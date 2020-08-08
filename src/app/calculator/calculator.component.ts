import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { VenuesMock } from '../mocks/venuesMock';
import { PeopleMock } from '../mocks/peopleMock';

export class Person {
  name: string;
  wontEat: string[];
  drinks: string[];
}

export class Venue {
  name: string;
  food: string[];
  drinks: string[];
}

export enum DeclineType {
  menu = 'menu',
  drinks = 'drinks'
}

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
  selectedList = new FormControl([]);
  bestPlaces: string[] = [];
  argues: string[] = [];
  venues: Venue[] = VenuesMock;
  people: Person[] = PeopleMock;

  constructor() {
  }

  ngOnInit(): void {
  }

  reset(): void {
    this.bestPlaces = this.venues.map((venue: Venue): string => venue.name);
    this.argues = [];
  }

  removeVenue(venueName: string, personName: string, index: number, type: DeclineType) {
    if (type === DeclineType.menu) {
      this.argues.push(`${venueName} - There is nothing for ${personName} eat here`);
    } else {
      this.argues.push(`${venueName} - There is nothing for ${personName} drink here`);
    }
    this.bestPlaces.splice(index, 1);
  }

  calculate(): void {
    this.reset();
    const selectedPeople = this.selectedList.value;

    if (selectedPeople.length !== 0) {
      selectedPeople.forEach((person: Person): void => {
        for (const venue of this.venues) {
          const index = this.bestPlaces.indexOf(venue.name);
          const okayMenu = venue.food.filter((food: string): boolean => !person.wontEat.includes(food));
          const okayBar = venue.drinks.filter((drink: string): boolean => person.drinks.includes(drink));

          if (!okayMenu.length) {
            this.removeVenue(venue.name, person.name, index, DeclineType.menu);
          }
          if (!okayBar.length) {
            this.removeVenue(venue.name, person.name, index, DeclineType.drinks);
          }
        }
      });
    }
  }
}
