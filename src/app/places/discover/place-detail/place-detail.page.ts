import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ActionSheetController, LoadingController, ModalController, NavController} from '@ionic/angular';
import {PlacesService} from '../../../service/places.service';
import {Place} from '../../../model/place';
import {CreateBookingComponent} from '../../../bookings/create-booking/create-booking.component';
import {Subscription} from 'rxjs';
import {BookingsService} from '../../../service/bookings.service';
import {AuthService} from '../../../service/auth.service';

@Component({
    selector: 'app-place-detail',
    templateUrl: './place-detail.page.html',
    styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit, OnDestroy {
    place: Place;
    isBookable = false;
    private placeSub: Subscription;

    constructor(
        private navController: NavController,
        private activatedRoute: ActivatedRoute,
        private placesService: PlacesService,
        private modalController: ModalController,
        private actionSheet: ActionSheetController,
        private bookingService: BookingsService,
        private loadingController: LoadingController,
        private authService: AuthService,
    ) {
    }

    ngOnInit() {
        this.activatedRoute.paramMap.subscribe(param => {
            if (!param.has('placeId')) {
                this.navController.navigateBack('/places/tabs/discover');
                return;
            }
            this.placeSub = this.placesService.find(param.get('placeId')).subscribe((place) => {
                this.place = place;
                //User is the creator of the place
                console.log(place.userId);
                console.log(this.authService.userId);
                this.isBookable = place.userId !== this.authService.userId;
            });
        });
    }

    ngOnDestroy() {
        if (this.placeSub) {
            this.placeSub.unsubscribe();
        }
    }

    async onBookPlaced() {
        const as = await this.actionSheet.create({
            header: 'Choose an Action',
            buttons: [
                {
                    text: 'Select Date',
                    handler: () => {
                        this.openBookingModal('select');
                    }
                }, {
                    text: 'Random Date',
                    handler: () => {
                        this.openBookingModal('random');
                    }
                }, {
                    text: 'Cancel',
                    role: 'cancel',
                }
            ]
        });

        return await as.present();
    }


    async openBookingModal(mode: 'select' | 'random') {
        console.log(mode);
        const modal = await this.modalController.create({
                component: CreateBookingComponent,
                componentProps: {
                    selectedPlace: this.place,
                    selectedMode: mode
                },
            })
        ;

        await modal.present();
        const result = await modal.onDidDismiss();

        if (result.role === 'confirm') {
            const loading = await this.loadingController.create({
                message: 'Booking this place ! hang in there',
            });

            await loading.present();
            const data = result.data.bookingData;
            this.bookingService.addBooking(
                this.place.id,
                this.place.title,
                this.place.imageUrl,
                data.firstName,
                data.lastName,
                data.guestNumber,
                data.startDate,
                data.endDate,
            ).subscribe(() => loading.dismiss());
        }
        console.log(result.data);

    }
}
