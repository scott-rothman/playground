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

  setArmType(roomID, characterID, armNum) {
    const data = {
      armNum: armNum
    };

    return this.db.database.ref(`rooms/${roomID}/characters/${characterID}`).update(data)
  }

  setLegType(roomID, characterID, legNum) {
    const data = {
      legNum: legNum
    };

    return this.db.database.ref(`rooms/${roomID}/characters/${characterID}`).update(data)
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

  updateCharacterDataLAR(roomID, characterID, degrees) {
    const data = {
      leftArmRotation: degrees
    };

    return this.db.database.ref(`rooms/${roomID}/characters/${characterID}`).update(data)
  }

  updateCharacterDataRAR(roomID, characterID, degrees) {
    const data = {
      rightArmRotation: degrees
    };

    return this.db.database.ref(`rooms/${roomID}/characters/${characterID}`).update(data)
  }

  updateCharacterFacing(roomID, characterID, facing) {
    const data = {
      facing: facing
    };

    return this.db.database.ref(`rooms/${roomID}/characters/${characterID}`).update(data)
  }
}
