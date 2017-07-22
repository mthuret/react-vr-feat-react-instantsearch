// Auto-generated content.
// This file contains the boilerplate to set up your React app.
// If you want to modify your application, start in "index.vr.js"
'use strict';
// Auto-generated content.
import { VRInstance } from 'react-vr-web';
import { Module } from 'react-vr-web';
import { ReactNativeContext } from 'react-vr-web';
import * as THREE from 'three';
import wordsToNumbers from 'words-to-numbers';
import { isNumber } from 'lodash';

function init(bundle, parent, options) {
  const annyang = new Annyang();

  const vr = new VRInstance(bundle, 'ReactVrFeatReactInstantSearch', parent, {
    // Add custom options here
    cursorVisibility: 'visible',
    nativeModules: [annyang],
  });

  annyang.setNativeContext(vr.rootView.context);

  vr.render = function() {
    // Any custom behavior you want to perform on each frame goes here
  };
  // Begin the animation loop
  vr.start();
  return vr;
}

export default class Annyang extends Module {
  constructor() {
    super('Annyang');

    // Variables
    this._rnctx = null;

    annyang.debug(true);

    var commands = {
      'I want to go to *tag': city => {
        this._rnctx.callFunction('RCTDeviceEventEmitter', 'emit', [
          'myWorkerEvent',
          { query: city },
        ]);
      },
      'We are :guest guests': guest => {
        console.log(isNumber(parseInt(guest)));
        console.log(wordsToNumbers(guest.toLowerCase()));
        this._rnctx.callFunction('RCTDeviceEventEmitter', 'emit', [
          'myWorkerEvent',
          {
            minGuest: isNumber(guest)
              ? parseInt(guest)
              : wordsToNumbers(guest.toLowerCase()),
            maxGuest: isNumber(guest)
              ? parseInt(guest)
              : wordsToNumbers(guest.toLowerCase()),
          },
        ]);
      },
      '*tag price between :minPrice and :maxPrice': (
        tag,
        minPrice,
        maxPrice
      ) => {
        this._rnctx.callFunction('RCTDeviceEventEmitter', 'emit', [
          'myWorkerEvent',
          {
            minPrice: isNumber(parseInt(minPrice))
              ? parseInt(minPrice)
              : wordsToNumbers(minPrice.toLowerCase()),
            maxPrice: isNumber(parseInt(maxPrice))
              ? parseInt(maxPrice)
              : wordsToNumbers(maxPrice.toLowerCase()),
          },
        ]);
      },
      'I want a *tag': tag => {
        let roomType = [];
        function contains(term) {
          return tag.includes(term);
        }
        if (contains('full house')) roomType.push('Entire home/apt');
        if (contains('entire house')) roomType.push('Entire home/apt');
        if (contains('full house')) roomType.push('Entire home/apt');
        if (contains('full apartment')) roomType.push('Entire home/apt');
        if (contains('shared room')) roomType.push('Shared room');
        if (contains('private room')) roomType.push('Private room');

        this._rnctx.callFunction('RCTDeviceEventEmitter', 'emit', [
          'myWorkerEvent',
          {
            roomType,
          },
        ]);
      },
      'Show :order results': order => {
        this._rnctx.callFunction('RCTDeviceEventEmitter', 'emit', [
          'myWorkerEvent',
          {
            pagination: order === 'next' ? 'next' : 'previous',
          },
        ]);
      },
    };
    annyang.debug(true);
    //annyang.setLanguage('FR_fr');
    // Add our commands to annyang
    annyang.addCommands(commands);

    // Start listening.
    annyang.start();
  }

  setNativeContext(rnctx) {
    // Context
    this._rnctx = rnctx;
  }
}

window.ReactVR = { init };
