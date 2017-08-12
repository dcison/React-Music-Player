import React from 'react';
import '../assets/Header.less';
//stateless写法--仅用于展示ui
const Header = () => {
    return (
    <div className="Music-Header row">
        <img className="Music-logo col-md-1 col-md-offset-1" src = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502285836535&di=829993f63ee14c02946959e0691ce6f1&imgtype=0&src=http%3A%2F%2Fimg.25pp.com%2Fuploadfile%2Fapp%2Ficon%2F20160612%2F1465695386432497.jpg" width="100" alt=""  />
        <h2 className="Music-title col-md-6 col-md-offset-1">React-Music-Player</h2>
    </div>
    )
};
export default Header;