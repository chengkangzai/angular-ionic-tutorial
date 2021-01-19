import {Component, OnDestroy, OnInit} from '@angular/core';
import {PlacesService} from '../../../service/places.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LoadingController, NavController} from '@ionic/angular';
import {Place} from '../../../model/place';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-edit-offer',
    templateUrl: './edit-offer.page.html',
    styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit, OnDestroy {

    place: Place;
    form: FormGroup;
    private placeSub: Subscription;

    constructor(
        private placesService: PlacesService,
        private activatedRoute: ActivatedRoute,
        private navController: NavController,
        private router: Router,
        private loadingController: LoadingController
    ) {
    }

    ngOnInit() {
        this.activatedRoute.paramMap.subscribe((paramMap) => {
            if (!paramMap.has('placeId')) {
                this.router.navigateByUrl('/places/tab/offers/{{place.id}}');
            }

            this.placeSub = this.placesService.find(paramMap.get('placeId')).subscribe((place) => {
                this.place = place;
                this.form = new FormGroup({
                    title: new FormControl(this.place.title, {
                        updateOn: 'blur',
                        validators: [Validators.required]
                    }),
                    description: new FormControl(this.place.description, {
                        updateOn: 'blur',
                        validators: [Validators.required, Validators.maxLength(180)]
                    }),
                    price: new FormControl(this.place.price, {
                        updateOn: 'blur',
                        validators: [Validators.required, Validators.min(1)]
                    })
                });
            });

        });
    }

    ngOnDestroy() {
        if (this.placeSub) {
            this.placeSub.unsubscribe();
        }
    }

    onUpdateOffer() {
        if (this.form.invalid) {
            return;
        }
        this.loadingController.create({
            message: 'Updating Place...',
        }).then((element) => {
            element.present();
            this.placesService.update(this.form.value.id, this.form.value.title, this.form.value.description).subscribe(() => {
                element.dismiss();
                this.form.reset();
                this.router.navigateByUrl('/places/tabs/offers');
            });
        });


    }

}
