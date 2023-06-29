import { Component, OnInit } from '@angular/core';

import { ToastController, LoadingController, Platform } from "@ionic/angular";

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Predmet } from '../models/predmet.model';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  predmeti: any;

  constructor(
    private load : LoadingController,
    private platform : Platform,
    private toast : ToastController,
    private firestore: AngularFirestore
  ) {}

  ngOnInit() {
   this.vratiPredmete();
  }

  

  async vratiPredmete() {

    let loader = await this.load.create({
      message: "Molim vas sacekajte...",
      spinner : "bubbles"
    });

    //pokreni loader
    loader.present();

    try {
    
      this.firestore.collection("predmeti").snapshotChanges().subscribe(res=>{
          this.predmeti = res.map(e=>{
            const data = e.payload.doc.data() as Predmet;
            return{
              id: e.payload.doc.id,
              naziv:data.naziv,
              semestar:data.semestar,
              obavezan: data.obavezan,
              espb: data.espb,
            }
          })   
          loader.dismiss();
      })

      // prekini loader
      //loader.dismiss();
        
    } catch (e) {
      this.showToast(e);
    }


  }


  ionViewWillEnter() {
    this.vratiPredmete();
  }
  showToast(poruka: any) {
    this.toast
      .create({
        message: poruka,
        duration: 3000
      })
      .then(toastData => toastData.present());
  }

  async obrisiPredmet(id : string) {
    let loader = await this.load.create({
      message: "Molim vas sacekajte...",
      spinner : "dots"
    });

    //pokreni loader
    loader.present();

    //obrisi predmet
    await this.firestore.doc("predmeti/"+id).delete();

     // prekini loader
     loader.dismiss();
  }
}
