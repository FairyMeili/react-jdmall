import React, { Component } from 'react'
import Request from '@/utils/request';
import LazyLoad from 'react-lazyload'
import { Transition } from 'react-transition-group'
import { ListView, PullToRefresh } from 'antd-mobile';
// import './index.scss'
import classnames from 'classnames'
import styless from './index.module.scss'

class ProductListPage extends Component {
	constructor(props) {
		super(props);
		const dataSource = new ListView.DataSource({
			rowHasChanged: (row1, row2) => row1.id !== row2.id
        });
		this.state = {
			dataSource,
			isLoading: true,
            refreshing: false,
            hasMore: true,
			list: [],
			page: 1,
            pageSize: 20,
		};
	}
	async getListData(page=1, pageSize=this.state.pageSize){
		this.setState({ isLoading: true });
		let res = await Request({
			method: 'post',
			url: '/product/list?type=recommend',
			data: {page, pageSize}
		});
		let newData = res.data.data;
        let _list = this.state.refreshing ? [...newData] : [...this.state.list, ...newData];
        let _hasMore = res.data.hasMore;
		this.setState({
			list: _list,
			dataSource: this.state.dataSource.cloneWithRows(_list),
			isLoading: false,
            refreshing: false,
            hasMore: _hasMore
        });
    }
    // 上拉滚动
	onEndReached = (event) => {
        if(!this.state.hasMore || this.state.isLoading){
            return;
        }
		console.log('reach end', event);
		let {page} = this.state;
		this.setState({
			page: ++page
		})
		this.getListData(page);
    }
    // 下拉刷新
	onRefresh = () => {
		this.setState({ refreshing: true });
		this.getListData();
	}
	componentDidMount() {
		this.getListData();
	}
	render() {
		const renderRow = (rowData, sectionID, rowID) => {
            // console.log(rowData, sectionID, rowID);
            const obj = this.state.list[rowID];
			return (
				<div className={styless['recommend-item']}>
                    <div className={styless['img-wrap']}>
						<LazyLoad throttle={200} height={300}>
							<Transition
								timeout={0}
								in={true}
								enter={false}
								exit={false} 
								appear={true}
								unmountOnExit={false}
							>
								{status=>(<img src={obj.img} className={`fade fade-${status}`} />)}
							</Transition>
						</LazyLoad>
                    </div>
                    <div className={styless['info-wrap']}>
                        <div className={styless['name']}>
                            {obj.name}
                        </div>
                        <div className={classnames('flex flex-x-full flex-y-center', styless['price'])}>
                            <span className="red">￥{obj.price}</span>
                            <a className={classnames(styless['opt'], 'check-similar')}>看相似</a>
                        </div>
                    </div>
                </div>
			);
		};
		return (
			<>
				<ListView
					ref={el => this.lv = el}
					dataSource={this.state.dataSource}
					renderFooter={() => (
						<div style={{textAlign: 'center', paddingBottom: '1.2rem'}}>
							{this.state.isLoading ? 'Loading...' : `${this.state.hasMore ? '' : '没有更多了'}`} 
						</div>
					)}
					renderRow={renderRow}
					onEndReached={this.onEndReached}
					onEndReachedThreshold={10}
					pullToRefresh={
						<PullToRefresh
							refreshing={this.state.refreshing}
							onRefresh={this.onRefresh}
						/>
					}
					// onScroll={() => { console.log('scroll'); }}
                    scrollRenderAheadDistance={100}
                    initialListSize={2}
					pageSize={4}
                    useBodyScroll
                    className="product-list"
				/>
			</>
		);
	}
}

export default ProductListPage;