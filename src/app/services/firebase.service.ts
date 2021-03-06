import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private db: AngularFireDatabase
  ) { }

  addNewCharacter(roomID) {
    return this.db.list(`rooms/${roomID}/characters`).push({
      x: 0,
      y: 0,
      name: 'name',
      actions: 'none'
    })
  }

  getRoomCharacters(roomID) {
    return this.db.database.ref(`rooms/${roomID}/characters`);
  }

  getCharacter(roomID, characterID) {
    return this.db.database.ref(`rooms/${roomID}/characters/${characterID}`);
  }

  updateCharacterDataX(roomID, characterID, posX) {
    const data = {
      x: posX
    };

    return this.db.database.ref(`rooms/${roomID}/characters/${characterID}`).update(data)
  }

  updateCharacterDataY(roomID, characterID, posY) {
    const data = {
      y: posY
    };

    return this.db.database.ref(`rooms/${roomID}/characters/${characterID}`).update(data)
  }

  updateCharacterDataActions(roomID, characterID, actions) {
    const data = {
      actions: actions
    };

    return this.db.database.ref(`rooms/${roomID}/characters/${characterID}`).update(data)
  }
}
