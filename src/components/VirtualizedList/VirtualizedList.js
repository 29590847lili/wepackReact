import React from 'react'
import { Button } from 'antd'
import { List, AutoSizer } from 'react-virtualized';
import Style from './VirtualizedList.scss';
const MyList = (props) => {
  const {width,height,data,rowHeight, myrender} = props
  console.log(props)
  // isRowLoaded= ({ index })=> {
  //   return !!list[index];
  // }
  
  // loadMoreRows= ({ startIndex, stopIndex })=> {
  //   return fetch(`path/to/api?startIndex=${startIndex}&stopIndex=${stopIndex}`)
  //     .then(response => {
  //       // Store response data in list...
  //     })
  // }
  return(
  //   <InfiniteLoader
  //   isRowLoaded={isRowLoaded}
  //   loadMoreRows={loadMoreRows}
  //   rowCount={data.length}
  // >
  //   {({ onRowsRendered, registerChild }) => (
      <AutoSizer >
        {/* style={{height:'100vh',width:'100vh', resize:'both',overflow:'auto' }} */}
      {({height, width}) => (
        <List
              width={width}
              height= {height}
              rowCount={data.length}
              rowHeight={rowHeight}
              rowRenderer={myrender}
             />
      )}
      </AutoSizer>
  //   )}
  // </InfiniteLoader>
  )
  
}

export default MyList