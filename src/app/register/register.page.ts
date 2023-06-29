import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { AngularFireAuth } from "@angular/fire/compat/auth";

import { ToastController, LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  user = {} as User;

  constructor(
    private toast : ToastController, 
    private load : LoadingController,
    private af : AngularFireAuth,
    private nav : NavController,
  ) { }

  ngOnInit() {
  }

  async registerUser(user: User) {

    if (this.formValidation()) {
      // validacija prosla

     
      let loader = await this.load.create({
        message: "Molim vas sacekajte...",
        spinner : "bubbles"
      });
        // pokreni loader
      loader.present();

      try {
        // registracija user-a sa email i lozinkom
        await this.af
          .createUserWithEmailAndPassword(user.email, user.password)
          .then(data => {
            console.log(data);
            // prebaci na home stranicu
            this.nav.navigateRoot("home");
          })
          .catch();
      } catch (e) {
        this.showToast(e);
      }
      // prekini loader
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
