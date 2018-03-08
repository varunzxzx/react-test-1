import React, { Component } from 'react'
import { List } from 'react-virtualized';
import './UserList.css'
const list = [
    'Brian Vaughn',
    'hgfhfghfg',
    'hghfghfgj',
    'utyuwqbbg',
    'hthwpqnjv'
];

function rowRenderer ({
    key,    
    index,    
    isScrolling,
    isVisible,
    style
}) {
    const datum = list[index];
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

class UserList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            listHeight: 500,
            listRowHeight: 50,
            overscanRowCount: 10,
            scrollToIndex: undefined,
            showScrollingPlaceholder: false,
            useDynamicRowHeight: false,
            rowCount: list.length
          };
    }
    render() {
        const {
            listHeight,
            listRowHeight,
            overscanRowCount,
            rowCount,
            scrollToIndex,
        } = this.state;

        return (
            <List
                ref="List"
                className={"List"}
                height={listHeight}
                overscanRowCount={overscanRowCount}
                rowCount={rowCount}
                rowRenderer={rowRenderer}
                scrollToIndex={scrollToIndex}
                rowHeight={listRowHeight}
                width={350}
            />
        )
    }
}

export default UserList;