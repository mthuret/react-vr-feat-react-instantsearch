import React from 'react';
import {
  AppRegistry,
  asset,
  StyleSheet,
  Pano,
  Text,
  View,
  NativeModules,
} from 'react-vr';
import { InstantSearch, Configure } from 'react-instantsearch/native';
import {
  connectHits,
  connectSearchBox,
  connectRange,
  connectMenu,
  connectRefinementList,
} from 'react-instantsearch/connectors';
import Button from './components/Button';

const RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');

export default class TrialReactVr extends React.Component {
  constructor() {
    super();
    this.state = {
      query: 'Paris',
      minGuest: 1,
      maxGuest: 6,
      roomType: [],
      annyang: NativeModules.Annyang,
    };
    RCTDeviceEventEmitter.addListener('myWorkerEvent', state => {
      console.log('state', state);
      this.setState({ ...this.state, ...state });
    });
  }

  render() {
    //const hits = this.state.query ? <Hits /> : null;
    return (
      <View>
        <InstantSearch
          appId="latency"
          apiKey="6be0576ff61c053d5f9a3225e2a90f76"
          indexName="airbnb"
        >
          <Pano
            source={asset(
              this.state.query
                ? `${this.state.query.toLowerCase()}.jpg`
                : 'default.jpg'
            )}
            style={{
              transform: [
                {
                  translate: [0, -10, 20],
                },
              ],
            }}
          />
          <Hits />
          <Configure hitsPerPage={5} />
          <SearchBox defaultRefinement={this.state.query} />
          <RefinementList
            defaultRefinement={this.state.roomType}
            attributeName={'room_type'}
          />
          <Range
            defaultRefinement={{
              min: this.state.minGuest,
              max: this.state.maxGuest,
            }}
            attributeName={'person_capacity'}
          />
          <Range
            defaultRefinement={
              this.state.minPrice
                ? {
                    min: this.state.minPrice,
                    max: this.state.maxPrice,
                  }
                : null
            }
            attributeName={'price'}
          />
        </InstantSearch>
      </View>
    );
  }
}

const Hits = connectHits(({ hits }) => {
  const buttons = hits.map(hit => {
    return (
      <Button
        key={hit.objectID}
        onClick={() => {
          this.props.onClick(hit.key);
        }}
        src={hit.picture_url}
        {...hit}
      />
    );
  });
  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        transform: [{ rotateX: -5 }, { translate: [-2, 0.7, -3] }],
        width: 5,
      }}
    >
      {buttons}
    </View>
  );
});

const SearchBox = connectSearchBox(() => null);
const Range = connectRange(() => null);
const RefinementList = connectRefinementList(() => null);
const Menu = connectMenu(() => null);

AppRegistry.registerComponent('TrialReactVr', () => TrialReactVr);
