import {Component, OnDestroy, OnInit} from '@angular/core';
import {PlacesService} from '../../service/places.service';
import {Place} from '../../model/place';
import {IonItemSliding} from '@ionic/angular';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-offers',
    templateUrl: './offers.page.html',
    styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit, OnDestroy {

    offers: Place[];
    private placesSub: Subscription;

    constructor(private placesService: PlacesService, private router: Router) {
    }

    ngOnInit() {
        this.placesSub = this.placesService.places.subscribe(places => {
            this.offers = places;
        });
    }

    ngOnDestroy() {
        if (this.placesSub) {
            this.placesSub.unsubscribe();
        }
    }

    async onEdit(id: string, slideItem: IonItemSliding) {
        await this.router.navigateByUrl('/places/tabs/offers/' + id);
        await slideItem.close();
    }

}
