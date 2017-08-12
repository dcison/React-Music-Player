import React from 'react';
import ReactDom from 'react-dom';
import Header from './components/js/Header';
import Player from './components/js/Player';
import { MUSIC_LIST } from './components/js/musicList';
import MusicList from './components/js/Music';
import { Router, IndexRoute, Link, Route, hashHistory } from 'react-router';
import Pubsub from 'Pubsub-js';
let module = ["refresh", "repeat", "random"];//顺序循坏，单曲循环，随机
export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMusicItem: MUSIC_LIST[0],
      musicList: MUSIC_LIST,
      currentModule: module[0],
      isPlay:true
    };
  }
  changeModule() {
    let index = module.indexOf(this.state.currentModule);
    this.setState({
      currentModule: module[(index + 1) % module.length]
    })
  }
  PlayMusic(Item) {
    $('#Player').jPlayer('setMedia', {
      mp3: Item.file
    }).jPlayer('play');
    this.setState({
      currentMusicItem: Item
    });
  };
  playNext(type = "next", Module) {
    let index = this.state.musicList.indexOf(this.state.currentMusicItem);
    let newIndex = null;
    if (Module !== "random") {
      if (type === "next") {
        newIndex = (index + 1) % this.state.musicList.length;
      } else {
        newIndex = (index - 1 + this.state.musicList.length) % this.state.musicList.length;
      }
    }else{
      newIndex = Math.round(Math.random()*6);
    }
    this.PlayMusic(this.state.musicList[newIndex]);
    if(!this.state.isPlay){
      $('#Player').jPlayer('pause');
    }   

  }
  playEnd(Module) {
    if (Module === "repeat") {
      this.PlayMusic(this.state.currentMusicItem);
    } else {
      this.playNext("next", Module);
    }
  }
  componentDidMount() {
    $('#Player').jPlayer({
      supplied: "mp3",
      wmode: 'window'
    });
    this.PlayMusic(this.state.currentMusicItem);
    $("#Player").bind($.jPlayer.event.ended, (e) => {
      this.playEnd(this.state.currentModule);
    })
    Pubsub.subscribe('MUSIC_PREV', (msg, type) => {
      this.playNext(type, this.state.currentModule);
    });
    Pubsub.subscribe('MUSIC_NEXT', (msg, type) => {
      this.playNext(type, this.state.currentModule);
    });
    Pubsub.subscribe('MUSIC_PLAY', (msg, Item) => {
      this.PlayMusic(Item, this.state.currentModule);
    });
    Pubsub.subscribe('MUSIC_ISPLAY', (msg, Item) => {
      console.log(Item);
      this.setState({
        isPlay: Item
      });
    });
    Pubsub.subscribe('MUSIC_DELETE', (msg, Item) => {
      this.setState({
        musicList: this.state.musicList.filter((i) => {
          return i !== Item;
        })
      })
    });
    Pubsub.subscribe('MODULECHANGE', (msg, Item) => {
      this.changeModule();
    });
  }
  componentWillUnmount() {
    Pubsub.unsubscribe('MODULECHANGE');
    Pubsub.unsubscribe('MUSIC_NEXT');
    Pubsub.unsubscribe('MUSIC_PREV');
    Pubsub.unsubscribe('MUSIC_DELETE');
    Pubsub.unsubscribe('MUSIC_PLAY');
    Pubsub.unsubscribe('MUSIC_ISPLAY');
    $("#Player").unbind($.jPlayer.event.ended);
  }
  render() {
    return (
      <div className="Root-Box">
        <Header />
        {React.cloneElement(this.props.children, this.state)}
      </div>
    )
  }
};
class App extends React.Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={Main} >
          <IndexRoute component={Player} />
          <Route path="/list" component={MusicList} />
        </Route >
      </Router>
    )
  }
};
ReactDom.render(<App />, document.getElementById('app'));