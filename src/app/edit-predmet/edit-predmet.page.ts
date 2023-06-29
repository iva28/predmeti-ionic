import { Component, OnInit } from '@angular/core';
import { Predmet } from '../models/predmet.model';
import { ToastController, LoadingController, NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from "@angular/router";


@Component({
  selector: 'app-edit-predmet',
  templateUrl: './edit-predmet.page.html',
  styleUrls: ['./edit-predmet.page.scss'],
})
export class EditPredmetPage implements OnInit {

  predmet = {} as Predmet;
  id: any;

  constructor(
    private toast : ToastController, 
    private load : LoadingController,
    private nav : NavController,
    private firestore: AngularFirestore,
    private actRoute : ActivatedRoute,
  ) { 
    this.id = this.actRoute.snapshot.paramMap.get("id");
  }

  ngOnInit() {
    this.getPredmetById(this.id);
  }

  async getPredmetById(id: string) {
    let loader = await this.load.create({
      message: "Molim vas sacekajte...",
      spinner : "bubbles"
    });

    loader.present();
    this.firestore.doc("predmeti/"+id)
    .valueChanges()
    .subscribe(data => {
      this.predmet.naziv = (data as Predmet)["naziv"];
      this.predmet.espb = (data as Predmet)["espb"];
      this.predmet.obavezan = (data as Predmet)["obavezan"];
      this.predmet.semestar = (data as Predmet)["semestar"];
      loader.dismiss();
    });
  }

  async updatePredmet(predmet: Predmet) {
    console.log("usao");
    if(this.formValidation()) {
      console.log("spremno");

      let loader = await this.load.create({
        message: "Molim vas sacekajte...",
        spinner : "bubbles"
      });
      loader.present();

      try {
        await this.firestore.doc("predmeti/" + this.id).update(predmet);
      } catch (e) {
        this.showToast(e);
      }

      await loader.dismiss();
      //nazad do home
      this.nav.navigateRoot("home");
    }
  } 


  formValidation() {
    
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
