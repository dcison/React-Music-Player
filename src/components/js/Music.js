import React from "react";
import ShowMusic from './ShowMusic';

class MusicList extends React.Component{
    render(){
        let Element = null;
        Element = this.props.musicList.map((item)=>{
            return <ShowMusic 
                focus = {item === this.props.currentMusicItem}
                key={item.id}
                musicItem = {item}
            >
                {item.title}
            </ShowMusic>
        })
        return(
            <ul>
                {Element}
            </ul>
        )
    }
};
export default MusicList;