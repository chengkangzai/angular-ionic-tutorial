import {Component, OnInit} from '@angular/core';
import {AuthService} from '../service/auth.service';
import {Router} from '@angular/router';
import {LoadingController} from '@ionic/angular';
import {NgForm} from '@angular/forms';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.page.html',
    styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
    isLoading = false;
    isLoginMode = true;

    constructor(
        private authService: AuthService,
        private router: Router,
        private loadingController: LoadingController,
    ) {
    }

    ngOnInit() {

    }

    onLogin() {
        this.isLoading = true;
        this.loadingController.create({
            message: 'Loading',
            keyboardClose: true
        }).then((el) => {
            return el.present();
        }).then(() => {
            this.authService.login();
            setTimeout(() => {
                this.isLoading = false;
                this.router.navigateByUrl('/places/tabs/discover');
                return this.loadingController.dismiss();
            }, 1000);
        });
    }

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return;
        }

        const email = form.value.email;
        const password = form.value.password;

        if (this.isLoginMode) {
            // Request to login Server
        } else {
            // Sign Up Server
        }
        console.log(email, password);
    }

    onSwitchAuthMode() {
        this.isLoginMode = !this.isLoginMode;
    }
}
