import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Place} from '../../model/place';
import {ModalController} from '@ionic/angular';
import {ISODateString} from '@capacitor/core';
import {NgForm} from '@angular/forms';

@Component({
    selector: 'app-create-booking',
    templateUrl: './create-booking.component.html',
    styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {
    @Input() selectedPlace: Place;
    @Input() selectedMode: 'select' | 'random';
    @ViewChild('f') form: NgForm;
    startDate: ISODateString;
    endDate: ISODateString;

    constructor(
        private modalController: ModalController,
    ) {
    }

    ngOnInit() {
        const availableForm = new Date(this.selectedPlace.availableFrom);
        const availableTo = new Date(this.selectedPlace.availableTo);

        if (this.selectedMode === 'random') {
            this.startDate = new Date(
                availableForm.getTime()
                + Math.random() * availableTo.getTime()
                - (7 * 24 * 60 * 60 * 1000) // one week in millisecond
                - availableForm.getTime()
            ).toISOString();

            this.endDate = new Date(
                new Date(this.startDate).getTime()
                + Math.random() *
                (new Date(this.startDate).getTime()
                    + 6 * 24 * 60 * 60 * 1000 // 6 day in millisecond
                    - new Date(this.startDate).getTime())
            ).toISOString();
        }
    }

    async onBookPlace() {
        if (this.form.invalid || !this.dateIsValid()) {
            return;
        }
        await this.modalController.dismiss({
            bookingData: {
                firstName: this.form.value.firstName,
                lastName: this.form.value.lastName,
                guestNumber: +this.form.value.guestNumber,
                startDate: new Date(this.form.value.dateFrom),
                endDate: new Date(this.form.value.dateTo),
            }
        }, 'confirm');
    }

    onCancel() {
        this.modalController.dismiss({message: null}, 'cancel');
    }


    dateIsValid() {
        const startDate = new Date(this.form?.value?.dateFrom);
        const endDate = new Date(this.form?.value?.dateTo);
        return endDate > startDate;
    }
}
