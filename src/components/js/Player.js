import React from 'react';
import Progress from './Progress';
import '../assets/Player.less';
import { Link } from 'react-router';
import Pubsub from 'Pubsub-js';
let duration;
class Player extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            progress: 0,
            volume: 0,
            isPlay:true,
            time:0
        };
    }
    componentDidMount() {
        $("#Player").bind($.jPlayer.event.timeupdate, (e) => {
            duration = e.jPlayer.status.duration;
            this.setState({
                time : e.jPlayer.status.currentTime,
                volume: e.jPlayer.options.volume * 100,
                progress: e.jPlayer.status.currentPercentAbsolute
            });
        });
    }
    componentWillUnmount() {
        $('#Player').unbind($.jPlayer.event.timeupdate)
    }
    progressChangeHandler(progress) {
        $('#Player').jPlayer('play', duration * progress);
        this.setState({
            isPlay: true
        });
    }
    volumeChangeHandler(progress){
        $('#Player').jPlayer('volume',progress)
    }
    play(){
        if(this.state.isPlay){
            $('#Player').jPlayer('pause');
        }else{
           $('#Player').jPlayer('play');
        };
        this.setState({
            isPlay: !this.state.isPlay
        });
        Pubsub.publish("MUSIC_ISPLAY",!this.state.isPlay);
    }
    prev(){
        Pubsub.publish("MUSIC_PREV","prev");
    }
    next(){
        Pubsub.publish("MUSIC_NEXT","next");
    }
    changeModule(){
        Pubsub.publish("MODULECHANGE");
    }
    render() {
        return (
            <div className='Music-Player'>
                <div id="Music-list" className="row"><span className=" col-md-2 col-md-offset-3"><span><Link to="/list">我的歌单></Link></span></span></div>
                <div id="Musician-cover">
                    <img src = {this.props.currentMusicItem.cover} alt={this.props.currentMusicItem.title}/>
                </div>
                <div id="Music-title" className="row">
                    <h1 className="col-md-2 col-md-offset-3">歌曲名字</h1>
                    <h3 className="col-md-2">{this.props.currentMusicItem.title}</h3>
                    
                </div>
                <div id="Musician" className="row">
                    <h2 className="col-md-2 col-md-offset-3">歌手</h2>
                    <h3 className="col-md-2">{this.props.currentMusicItem.artist}</h3>                    
                </div>
                
                <div id="Music-sound">
                    <span className="glyphicon glyphicon-volume-down  col-md-1 col-md-offset-3"></span>
                    <span className="soundControl col-md-1">                  
                    <Progress
                        progress= {this.state.volume}
                        progressChange={this.volumeChangeHandler.bind(this)}
                        barColor="#E9F01D"
                    />
                    </span>
                </div>
                              
                <div className="Music-control container-fluid">
                    <div>
                        <i id = "prev" onClick={this.prev}className="col-md-1 col-md-offset-1"><span className="glyphicon glyphicon-chevron-left" /></i>
                        <i id = "play" onClick={this.play.bind(this)} className="col-md-1"><span className={`glyphicon glyphicon-${this.state.isPlay? 'pause':'play'}`}/></i>
                        <i id = "next" onClick={this.next}className="col-md-1"><span className="glyphicon glyphicon-chevron-right" /></i>
                    </div>
                    <div>
                        <i id = "repeact" className="col-md-1"><span onClick={this.changeModule} className={`glyphicon glyphicon-${this.props.currentModule}`}/></i>
                        <div id="Music-time" className="col-md-1 col-md-offset-5">时间:{$.jPlayer.convertTime(this.state.time)}</div>  
                    </div>
                </div>
                <div className="Music-Player-progess">
                <Progress
                    progress= {this.state.progress}
                    progressChange={this.progressChangeHandler.bind(this)}
                    barColor="#00FF80"
                >
                </Progress>
                </div>
            </div>
        )
    }
}
export default Player;