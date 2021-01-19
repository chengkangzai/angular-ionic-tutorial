import {Injectable} from '@angular/core';
import {Booking} from '../model/booking';
import {BehaviorSubject} from 'rxjs';
import {AuthService} from './auth.service';
import {delay, last, map, take, tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class BookingsService {
    // tslint:disable-next-line:variable-name
    private _bookings = new BehaviorSubject<Booking[]>([
        new Booking(
            'xyz',
            'p1',
            '2',
            'Mahattan Mansion',
            'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.6sqft.com%2Fwp-content%2Fuploads%2F2014%2F06%2FCarnegie-Mansion-nyc.jpg&f=1&nofb=1',
            'Jeff',
            'Bezzos',
            2,
            new Date('2020-01-01'),
            new Date('2020-02-01')),
    ]);

    constructor(
        private authService: AuthService,
    ) {
    }

    get booking() {
        return this._bookings.asObservable();
    }

    find(id: string) {
        return this.booking.pipe(take(1), map((booking) => {
            return {...booking.find(b => b.id === id)};
        }));
    }

    addBooking(
        placeId: string,
        placeTitle: string,
        placeImg: string,
        firstName: string,
        lastName: string,
        guestNumber: number,
        dateFrom: Date,
        dateTo: Date
    ) {
        console.log('receivedMessageFromWorker');
        const newBooking = new Booking(
            Math.random().toString(),
            placeId,
            this.authService.userId,
            placeTitle,
            placeImg,
            firstName,
            lastName,
            guestNumber,
            dateFrom,
            dateTo);

        return this.booking.pipe(
            take(1),
            delay(1000),
            tap((place) => {
                this._bookings.next(place.concat(newBooking));
            }));
    }

    cancelBooking(bookingId: string) {
        return this.booking.pipe(
            take(1),
            delay(1000),
            tap((place) => {
                this._bookings.next(place.filter(p => p.id !== bookingId));
            }));
    }

}
