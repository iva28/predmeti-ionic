import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from "@angular/fire/compat/auth";
import { User } from '../models/user.model';
import { ToastController, LoadingController, NavController, Platform } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user = {} as User;

  constructor(
    private toast: ToastController,
    private load: LoadingController,
    private af: AngularFireAuth,
    private nav: NavController,
    private platform: Platform
  ) { }


  ngOnInit() {
  }

  async loginUser(user: User) {
    if (this.formValidation()) {
      //uspesno prosla validacija za login

      let loader = await this.load.create({
        message: "Molim vas sacekajte...",
        spinner: "bubbles"
      });
      loader.present();
      try {
        // login user-a pomocu email-a i lozinke
        await this.af
          .signInWithEmailAndPassword(user.email, user.password)
          .then(data => {
            console.log(data);

            //prebaci se na home stranu
            this.nav.navigateRoot("home");
          })
          .catch();
      } catch (e) {
        this.showToast(e);
      }
      loader.dismiss();
    }
  }

  formValidation() {
    if (!this.user.email) {
      this.showToast("Unesite email!");
      return false;
    }

    if (!this.user.password) {
      this.showToast("Unesite lozinku!");
      return false;
    }
    return true;
  }

  showToast(poruka: any) {
    this.toast
      .create({
        message: poruka,
        duration: 3000
      })
      .then(toastData => toastData.present());
  }
}
