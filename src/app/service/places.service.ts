import {Injectable} from '@angular/core';
import {Place} from '../model/place';
import {AuthService} from './auth.service';
import {BehaviorSubject, concat, Observable} from 'rxjs';
import {delay, map, take, tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class PlacesService {
    // tslint:disable-next-line:variable-name
    private _places = new BehaviorSubject<Place[]>([
        new Place(
            'p1',
            'Manhattan Manson',
            'In the heart of New York City',
            'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.6sqft.com%2Fwp-content%2Fuploads%2F2014%2F06%2FCarnegie-Mansion-nyc.jpg&f=1&nofb=1',
            149.99,
            new Date('2020-01-01'),
            new Date('2020-12-20'),
            'abc'
        ),
        new Place(
            'p2',
            `L'Amour Bonjour`,
            'Romantic place in Paris',
            'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fstatic1.squarespace.com%2Fstatic%2F54b30f27e4b07e1bade0f312%2Ft%2F5522652ee4b0adb698706c66%2F1428317527378%2F%3Fformat%3D1000w&f=1&nofb=1',
            189.99,
            new Date('2020-01-01'),
            new Date('2020-12-20'),
            '1'
        ),
        new Place(
            'p3',
            `The Foggy Place`,
            'Not the average city trip',
            'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fc2.staticflickr.com%2F2%2F1043%2F815753674_05714c4329_b.jpg&f=1&nofb=1',
            99.99,
            new Date('2020-01-01'),
            new Date('2020-12-20'),
            '1'
        ),
    ]);

    constructor(private authService: AuthService) {
    }


    get places() {
        return this._places.asObservable();
    }

    find(id: string): Observable<Place> {
        return this.places.pipe(take(1), map((places) => {
            return {...places.find(p => p.id === id)};
        }));
    }

    addPlace(title: string, description: string, price: number, dateFrom: Date, dateTo: Date) {
        const newPlace = new Place(
            Math.random().toString(),
            title,
            description,
            'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fc2.staticflickr.com%2F2%2F1043%2F815753674_05714c4329_b.jpg&f=1&nofb=1',
            price,
            dateFrom,
            dateTo,
            this.authService.userId
        );
        return this._places.pipe(
            take(1),
            delay(1000),
            tap((place) => {
                this._places.next(place.concat(newPlace));
            }));
    }

    update(placeId: string, title: string, description: string) {
        return this.places.pipe(take(1), delay(1000), tap(place => {
            const updatePlaceIndex = place.findIndex(p => p.id === placeId);
            const updatePlaces = [...place];
            const old = updatePlaces[updatePlaceIndex];
            updatePlaces[updatePlaceIndex] = new Place(
                old.id, title, description, old.imageUrl, old.price, old.availableFrom, old.availableTo, old.userId
            );
            this._places.next(updatePlaces);
        }));
    }
}
