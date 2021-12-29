import React from 'react'
import { Button } from 'antd'
import Style from './app.module.scss'
import VirtualizeList from './components/VirtualizedList/VirtualizedList'
import VirtualList from "./components/MyVirtualizedList/virtual-list";
import VirtualListAutoHeight from "./components/MyVirtualizedList/virtual-list-autoheight";
const About = () => {
  console.log('about'); // this is about
  const rowCount = 500;
  const list = Array(rowCount).fill('mmmm');
  const rowRenderer = ({key, index, isScrolling, isVisible, style,})=>{
    return  list.map((item,index)=>{
            return (
                <div key={index} className="list">
                  <div className="item-name">{item+index}</div>
                  <div className="item-name">aaa</div>
                  <div className="item-name">bbb</div>
                  <div className="item-name">ccc</div>
                  <div className="item-name">ddd</div>
                </div>
            )
        })
}
  return(
    <div className={Style.content}>
      <div className={Style.header}>header</div>
      <div className={Style.body} >
        <div className={Style.leftList}>
          <VirtualizeList data={list}  rowHeight={40} myrender = {rowRenderer}/>
        </div>
        <div className={Style.right}>
          <VirtualListAutoHeight />
          
          <VirtualList/>
          <h1 className={Style.app}>About Page</h1>
          <Button>button</Button>
        </div>
      </div>
    </div>
  )
  
}

export default About