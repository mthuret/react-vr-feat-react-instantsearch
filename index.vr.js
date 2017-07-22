import React from 'react';
import {
  AppRegistry,
  asset,
  StyleSheet,
  Pano,
  Text,
  View,
  NativeModules,
  VrButton,
  Image,
} from 'react-vr';
import { InstantSearch, Configure } from 'react-instantsearch/native';
import {
  connectHits,
  connectSearchBox,
  connectRange,
  connectMenu,
  connectRefinementList,
  connectPagination,
} from 'react-instantsearch/connectors';

const RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');

export default class ReactVrFeatReactInstantSearch extends React.Component {
  constructor() {
    super();
    this.state = {
      query: 'San Francisco',
      minGuest: 1,
      page: 0,
      maxGuest: 6,
      roomType: [],
      visitFlat: false,
      annyang: NativeModules.Annyang,
    };
    RCTDeviceEventEmitter.addListener('myWorkerEvent', state => {
      let page = this.state.page;
      if (state.pagination && state.pagination === 'next') {
        page = page + 1;
      } else if (
        state.pagination &&
        state.pagination === 'previous' &&
        page > 0
      ) {
        page = page - 1;
      }
      this.setState({ ...this.state, ...state, page });
    });
    this.onClick = this.onClick.bind(this);
    this.find = this.find.bind(this);
  }

  onClick() {
    this.setState({ visitFlat: !this.state.visitFlat });
  }

  find(cityName) {
    return ['sanfrancisco', 'paris', 'sydney', 'rome'].find(
      city => city === cityName
    );
  }

  render() {
    //const hits = this.state.query ? <Hits /> : null;
    const searchInterface = !this.state.visitFlat
      ? <SearchInterface {...this.state} onClick={this.onClick} />
      : null;

    const backButton = this.state.visitFlat
      ? <BackButton onClick={this.onClick} />
      : null;

    const cityName = this.state.query.replace(' ', '').toLowerCase();
    const assetFilename = this.find(cityName) ? cityName : 'default';
    return (
      <View>
        <Pano
          source={asset(
            !this.state.visitFlat ? `${assetFilename}.jpg` : 'flat.jpg'
          )}
          style={{
            transform: [
              {
                translate: [0, -10, 20],
              },
            ],
          }}
        />
        {backButton}
        {searchInterface}
      </View>
    );
  }
}

const SearchInterface = props =>
  <InstantSearch
    appId="latency"
    apiKey="6be0576ff61c053d5f9a3225e2a90f76"
    indexName="airbnb"
  >
    <Hits onClick={props.onClick} />
    <Configure hitsPerPage={5} />
    <SearchBox defaultRefinement={props.query} />
    <RefinementList
      defaultRefinement={props.roomType}
      attributeName={'room_type'}
    />
    <Range
      defaultRefinement={{
        min: props.minGuest,
        max: props.maxGuest,
      }}
      attributeName={'person_capacity'}
    />
    <Range
      defaultRefinement={
        props.minPrice
          ? {
              min: props.minPrice,
              max: props.maxPrice,
            }
          : null
      }
      attributeName={'price'}
    />
    <Pagination defaultRefinement={props.page} />
  </InstantSearch>;

const Hits = connectHits(({ hits, onClick }) => {
  const buttons = hits.map(hit => {
    return (
      <FlatButton
        key={hit.objectID}
        onClick={() => {
          onClick(hit.key);
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

class BackButton extends React.Component {
  onButtonClick = () => {
    this.props.onClick();
  };

  render() {
    return (
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          transform: [{ translate: [1.8, 1.5, -3] }],
          width: 5,
        }}
      >
        <VrButton onClick={this.onButtonClick}>
          <Image
            style={{
              width: 0.7,
              height: 0.7,
            }}
            source={asset('goBack.png')}
          />
        </VrButton>
      </View>
    );
  }
}

class FlatButton extends React.Component {
  onButtonClick = () => {
    this.props.onClick();
  };

  render() {
    return (
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          margin: 0.1,
          width: 0.7,
          backgroundColor: '#0099ff',
        }}
      >
        <VrButton onClick={this.onButtonClick}>
          <Image
            style={{
              width: 0.7,
              height: 0.7,
            }}
            source={{ uri: this.props.src }}
          />
          <Text style={{ textAlign: 'center' }}>
            {this.props.name} - {this.props.price}$
          </Text>
          <Text style={{ textAlign: 'center' }}>
            {this.props.room_type} - {this.props.city},{this.props.country}
          </Text>
          <Text style={{ textAlign: 'center' }}>
            {this.props.person_capacity} guests
          </Text>
        </VrButton>
      </View>
    );
  }
}

const SearchBox = connectSearchBox(() => null);
const Range = connectRange(() => null);
const RefinementList = connectRefinementList(() => null);
const Menu = connectMenu(() => null);
const Pagination = connectPagination(() => null);

AppRegistry.registerComponent(
  'ReactVrFeatReactInstantSearch',
  () => ReactVrFeatReactInstantSearch
);
