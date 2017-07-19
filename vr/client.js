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

  const vr = new VRInstance(bundle, 'TrialReactVr', parent, {
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
  _rnctx: ReactNativeContext;
  recognition: Object;

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
      'For a price between :minPrice and :maxPrice': (minPrice, maxPrice) => {
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
    };
    annyang.debug(true);
    // Add our commands to annyang
    annyang.addCommands(commands);

    // Start listening.
    annyang.start();
  }

  setNativeContext(rnctx: ReactNativeContext) {
    // Context
    this._rnctx = rnctx;
  }

  $start(resolve, reject) {
    this.startListening();

    // Get the speech recognition from annyang
    this.recognition = annyang.getSpeechRecognizer();

    var thisRef = this;

    // Override method onresult
    this.recognition.onresult = function(event) {
      // Get the speech result
      var SpeechResults = event.results[event.resultIndex];

      if (thisRef._rnctx !== 'undefined')
        thisRef._rnctx.invokeCallback(resolve, [SpeechResults[0].transcript]);
    };
  }

  startListening() {
    // Stop annyang if its listening
    if (annyang.isListening) {
      stop();
    }

    // Start again
    console.log('Start');
    annyang.start();
  }

  stop() {
    annyang.abort();
    console.log('Stop');
  }

  addCommands(commands) {
    annyang.addCommands(commands);
  }
}

window.ReactVR = { init };
