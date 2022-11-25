import * as React from 'react';
import {IonPhaser} from "@ion-phaser/react";
import {config} from "../Game/PhaserGame";

export function HomePage() {
  return (
      <>
          <IonPhaser game={config()} />
      </>
  );
}
