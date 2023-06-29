import { Component, OnInit } from '@angular/core';
import { Predmet } from '../models/predmet.model';

import { ToastController, LoadingController, NavController } from '@ionic/angular';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-add-predmet',
  templateUrl: './add-predmet.page.html',
  styleUrls: ['./add-predmet.page.scss'],
})
export class AddPredmetPage implements OnInit {
  predmet = {} as Predmet;
  constructor(
    private toast : ToastController, 
    private load : LoadingController,
    private af : AngularFireAuth,
    private nav : NavController,
    private firestore: AngularFirestore
  ) { }

  ngOnInit() {
  }

  async dodajPredmet(predmet : Predmet) {
    if (this.formValidation()) {
      //prosla validacija

      let loader = await this.load.create({
        message: "Molim vas sacekajte...",
        spinner : "bubbles"
      });

      //pokreni loader
      loader.present();

      try{
        await this.firestore.collection("predmeti").add(predmet);

      } catch(e) {
        this.showToast(e);
      }

      //zaustavi loader
      loader.dismiss();

      //prebaci na home stranicu
      this.nav.navigateRoot("home");
    }

  }

  formValidation() {
    if (!this.predmet.naziv) {
      this.showToast("Unesite naziv premeta!");
      return false;
    }

    if (!this.predmet.semestar) {
      this.showToast("Unesite semestar u kojem se predmet polaze!");
      return false;
    }

    if (!this.predmet.espb) {
      this.showToast("Unesite broj espb poena koji predmet nosi!");
      return false;
    }
    if (!this.predmet.obavezan) {
      this.showToast("Unesite da li je predmet obavezan!");
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
