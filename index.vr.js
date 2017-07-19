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
import { InstantSearch } from 'react-instantsearch/native';
import {
  connectHits,
  connectSearchBox,
  connectRange,
  connectMenu,
  connectRefinementList,
} from 'react-instantsearch/connectors';
const RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');

export default class TrialReactVr extends React.Component {
  constructor() {
    super();
    this.state = {
      query: '',
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
    console.log('this.state', this.state);
    const hits = this.state.query ? <Hits /> : null;
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
          />
          {hits}
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
  const toto = hits.map(hit =>
    <Text
      style={{
        backgroundColor: 'blue',
        padding: 0.02,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 0.8,
        layoutOrigin: [0.5, 0.5],
        transform: [{ translate: [0, 0, -3] }],
      }}
    >
      {hit.name}
    </Text>
  );
  return (
    <View>
      {toto}
    </View>
  );
});

const SearchBox = connectSearchBox(() => null);
const Range = connectRange(() => null);
const RefinementList = connectRefinementList(() => null);
const Menu = connectMenu(() => null);

AppRegistry.registerComponent('TrialReactVr', () => TrialReactVr);
