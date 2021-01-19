import {Component, OnDestroy, OnInit} from '@angular/core';
import {PlacesService} from '../../../service/places.service';
import {Place} from '../../../model/place';
import {ActivatedRoute, Router} from '@angular/router';
import {NavController} from '@ionic/angular';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-offer-booking',
    templateUrl: './offer-booking.page.html',
    styleUrls: ['./offer-booking.page.scss'],
})
export class OfferBookingPage implements OnInit, OnDestroy {

    place: Place;
    private placeSub: Subscription;

    constructor(
        private ps: PlacesService,
        private activatedRoute: ActivatedRoute,
        private navController: NavController
    ) {
    }

    ngOnInit() {
        this.activatedRoute.paramMap.subscribe(param => {
            if (!param.has('placeId')) {
                this.navController.navigateBack('/places/tabs/offers');
                return;
            }
            this.placeSub = this.ps.find(param.get('placeId')).subscribe((place) => {
                this.place = place;
            });
        });
    }

    ngOnDestroy() {
        if (this.placeSub) {
            this.placeSub.unsubscribe();
        }
    }
}
