import React, { Component } from 'react';
import classnames from 'classnames';
import SvgIcon from '@/components/SvgIcon';
import { SearchBar, WingBlank } from 'antd-mobile';
import './index.scss';

export default class JDSearchBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            keywords: ['怡宝矿泉水', '双11热卖', '热水壶'],
            curIndex: 0
        }
    }
    componentDidMount(){
        this.sTimer = setInterval(()=>{
            let _curIndex = this.state.curIndex;
            _curIndex = _curIndex>=this.state.keywords.length-1 ? 0 : _curIndex++;
            this.setState((nextState, props)=>({curIndex: _curIndex}));
        }, 3000);
    }
    componentWillMount(){
        clearInterval(this.sTimer);
    }
    render() {
        let {keywords, curIndex} = this.state;
        return (
            <div className="search-bar" flag={this.props.flag}>
                <WingBlank>
                    <div className={classnames('flex', 'flex-y-center')}>
                        <div style={{'paddingRight': '10px'}}>
                            <SvgIcon iconClass="menu" size="18px" />
                        </div>
                        <SearchBar 
                            className="flex-1" 
                            placeholder={keywords[curIndex]}
                        />
                        <div style={{'paddingLeft': '10px'}}>
                            <a>登录</a>
                        </div>
                    </div>
                </WingBlank>
            </div>
        )
    }
}
