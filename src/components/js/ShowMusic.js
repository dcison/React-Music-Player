import React from 'react';
import '../assets/ShowMusic.less';
import Pubsub from 'Pubsub-js';
class ShowMusic extends React.Component{
    playMusic(Item){
        Pubsub.publish("MUSIC_PLAY",Item);
    }
    deleteMusic(Item){
        Pubsub.publish("MUSIC_DELETE",Item);
    }
    render(){
        let Item = this.props.musicItem;
        return(
            <li className={`row list-box ${this.props.focus ? 'focus':''}`}>
                <span>
                    <b className="col-md-4 col-md-offset-1" onClick={this.playMusic.bind(this,Item)}>
                        {Item.title}
                    </b>
                </span> 
                <span className="col-md-3">{Item.artist}</span>
                <span onClick={this.deleteMusic.bind(this,Item)} className="delete col-md-4 glyphicon glyphicon-remove" />
            </li>
        )
    }
};
export default ShowMusic;