import {Component, OnDestroy, OnInit} from '@angular/core';
import {PlacesService} from '../../service/places.service';
import {Place} from '../../model/place';
import {Subscription} from 'rxjs';
import preventExtensions = Reflect.preventExtensions;
import {AuthService} from '../../service/auth.service';

@Component({
    selector: 'app-discover',
    templateUrl: './discover.page.html',
    styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {
    loadedPlaces: Place[];
    listedLoadedPlaces: Place[];
    relevantPlaces: Place[];
    private placeSub: Subscription;

    constructor(
        private placesService: PlacesService,
        private authService: AuthService
    ) {
    }

    ngOnInit() {
        this.placeSub = this.placesService.places.subscribe((place) => {
            this.loadedPlaces = place;
            this.relevantPlaces = this.loadedPlaces;
            this.listedLoadedPlaces = this.relevantPlaces.slice(1);
        });
    }

    ngOnDestroy() {
        if (this.placeSub) {
            this.placeSub.unsubscribe();
        }
    }

    onFilterUpdate(event: CustomEvent) {
        if (event.detail.value === 'all') {
            this.relevantPlaces = this.loadedPlaces;
            this.listedLoadedPlaces = this.relevantPlaces.slice(1);
        } else {
            this.relevantPlaces = this.loadedPlaces.filter((place) => {
                return place.userId !== this.authService.userId;
            });
            this.listedLoadedPlaces = this.relevantPlaces.slice(1);
        }
    }
}
