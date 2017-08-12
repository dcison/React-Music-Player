import React from 'react';
import '../assets/Progress.less';

class Progress extends React.Component{
    static defaultProps = {
        barColor: "purple" 
    };
    changeProgress(e){
        let progressBar = this.refs.progressBar;
        let progress = (e.clientX - progressBar.getBoundingClientRect().left)/progressBar.clientWidth;
        if(this.props.progressChange){
            this.props.progressChange(progress);
        }            
    }
    render() {
        return (
            <div className="Music-Progress" ref="progressBar" onClick={this.changeProgress.bind(this)}>
                <div className="progress" style={{width:`${this.props.progress}%`,background:this.props.barColor}}></div>
            </div>
        );
    }
};
export default Progress;