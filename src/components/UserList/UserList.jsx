import React, { Component } from 'react'
import { List, AutoSizer } from 'react-virtualized';
import './UserList.css'

let userslist = []

class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listRowHeight: 60,
            overscanRowCount: 10,
            scrollToIndex: undefined,
            showScrollingPlaceholder: false,
            useDynamicRowHeight: false,
            rowCount: 1,
            userslist: []
          };
    }

    componentWillReceiveProps = (props) => {
        userslist = props.userslist;
        const rowCount = userslist.length;
        console.log(userslist, rowCount)
        this.setState({userslist, rowCount})
    }

    rowRenderer = ({
        key,    
        index,    
        isScrolling,
        isVisible,
        style
    }) => {
        const datum = userslist[index] || 'Loading';
        return (
            <div className={"row"} key={key} style={style}>
                <div
                className={"letter"}
                style={{
                    backgroundColor: "rgb(63, 81, 181)",
                }}>
                    {datum.charAt(0).toUpperCase()}
                </div>
                <div>
                    <div className={"name"}>{datum}</div>
                </div>
            </div>
        );
    }    

    render() {
        const {
            listRowHeight,
            overscanRowCount,
            rowCount,
            scrollToIndex,
        } = this.state;

        return (
            <div className="users-list">
                <h3 className="sub-head">Active Users</h3>
                {userslist.length !== 0 && <AutoSizer >
                    {({width, height}) => (
                        <List
                            ref="List"
                            className={"List"}
                            height={height}
                            overscanRowCount={overscanRowCount}
                            rowCount={rowCount}
                            rowRenderer={this.rowRenderer}
                            scrollToIndex={scrollToIndex}
                            rowHeight={listRowHeight}
                            width={width}
                        />
                    )}
                </AutoSizer>}
            </div>
        )
    }
}

export default UserList;