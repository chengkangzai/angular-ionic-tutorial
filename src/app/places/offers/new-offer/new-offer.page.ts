import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PlacesService} from '../../../service/places.service';
import {Router} from '@angular/router';
import {LoadingController} from '@ionic/angular';

@Component({
    selector: 'app-new-offer',
    templateUrl: './new-offer.page.html',
    styleUrls: ['./new-offer.page.scss'],
})
export class NewOfferPage implements OnInit {
    form: FormGroup;

    constructor(
        private placesService: PlacesService,
        private router: Router,
        private loadingController: LoadingController,
    ) {
    }

    ngOnInit() {
        this.form = new FormGroup({
            title: new FormControl(null, {
                updateOn: 'blur',
                validators: [Validators.required]
            }),
            description: new FormControl(null, {
                updateOn: 'blur',
                validators: [Validators.required, Validators.maxLength(180)]
            }),
            price: new FormControl(null, {
                updateOn: 'blur',
                validators: [Validators.required, Validators.min(1)]
            }),
            dateFrom: new FormControl(null, {
                updateOn: 'blur',
                validators: [Validators.required]
            }),
            dateTo: new FormControl(null, {
                updateOn: 'blur',
                validators: [Validators.required]
            }),
        });
    }

    async onCreateOffer() {
        if (this.form.invalid) {
            return;
        }

        this.loadingController.create({
            message: 'Loading',
            keyboardClose: true
        }).then((loadingEl) => {
            loadingEl.present();
            const form = this.form.value;
            this.placesService.addPlace(form.title, form.description, form.price, form.dateFrom, form.dateTo).subscribe(() => {
                loadingEl.dismiss();
                this.form.reset();
                this.router.navigateByUrl('/places');
            });
        });

    }
}
