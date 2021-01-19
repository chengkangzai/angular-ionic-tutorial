import {Component, OnDestroy, OnInit} from '@angular/core';
import {BookingsService} from '../service/bookings.service';
import {Booking} from '../model/booking';
import {IonItemSliding, LoadingController} from '@ionic/angular';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-bookings',
    templateUrl: './bookings.page.html',
    styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit, OnDestroy {
    bookings: Booking[];
    private bookingSub: Subscription;

    constructor(
        private bookingsService: BookingsService,
        private loadingController: LoadingController,
    ) {
    }

    ngOnInit() {
        this.bookingSub = this.bookingsService.booking.subscribe((bookings) => {
            this.bookings = bookings;
        });
    }

    ngOnDestroy() {
        if (this.bookingSub) {
            this.bookingSub.unsubscribe();
        }
    }

    async onCancelBooking(bookingId: string, ItemSliding: IonItemSliding) {
        await ItemSliding.close();
        const loading = await this.loadingController.create({
            message: 'Canceling...'
        });
        await loading.present();
        this.bookingsService.cancelBooking(bookingId).subscribe();
        await loading.dismiss();
    }


}
