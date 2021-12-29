import React, { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "antd";
import "./index.css";

const datasource = new Array(100).fill(1).map((item, idx) => idx);
const Test = () => {
  const [visible, setVisible] = useState(true);
  const [dataSlice, setDataSlice] = useState([]); //数据切片
  const [itemHeight, setItemHeight] = useState(40); //子item高度
  const [scrollDis, setScrollDis] = useState(0);
  const refContainer = useRef();
  const refVirtualContainer = useRef();
  const refItem = useRef();

  useEffect(() => {
    if (!visible) return;
    //设置虚拟容器高度
    const containerHeight = itemHeight * datasource.length;
    refVirtualContainer.current.style.height = containerHeight + "px";
    //设置可视区域数据
    let refContainerHeight = refContainer.current.clientHeight;
    const num = Math.ceil(refContainerHeight / itemHeight);
    setDataSlice(datasource.slice(0, num));

    let timer = null;
    const delay = 50; //节流50ms
    let startTime = Date.now();
    refContainer.current.addEventListener("scroll", (e) => {
      console.log('开始')
      let curTime = Date.now();
      let remaining = delay - (curTime - startTime);
      if (timer) clearTimeout(timer);
      // 设置第一次滚动时触发方法
      if (remaining <= 0) {
        console.log('正在开始')
        startTime = Date.now();
        setData(e.target.scrollTop, refContainerHeight, containerHeight);
      } else {
        timer = setTimeout(() => {
          setData(e.target.scrollTop, refContainerHeight, containerHeight);
          timer = null;
        }, delay);
      }
    });
  }, [itemHeight, visible]);

  const setData = (scrollTop, refContainerHeight, containerHeight) => {
    // scrollTop 相对最外层container距离滚动条顶部的距离
    // refContainerHeight  container可视区域数据
    // containerHeight 虚拟容器高度
    const beginNum = Math.ceil(
      (scrollTop / containerHeight) * datasource.length
    );
    const domNum = Math.ceil(refContainerHeight / itemHeight); // 可视区域可以看到的元素个数
    setDataSlice(datasource.slice(beginNum, domNum * 2 + beginNum));
    setScrollDis(scrollTop);
  };

  const visbileClick = () => {
    setVisible((vis) => !vis);
    setDataSlice([]);
    setScrollDis(0);
  };

  return (
    <div>
      <div onClick={visbileClick}>virtualList</div>
      {visible ? (
        <div ref={refContainer} className="container">
          <div className="virtual-container" ref={refVirtualContainer}>
            <div
              className="virtual"
              style={{ transform: `translateY(${scrollDis}px)` }}
            >
              {dataSlice.map((item, idx) =>(
                <div
                  key={idx}
                  className="item"
                  ref={refItem}
                  style={{ height: itemHeight, lineHeight: `${itemHeight}px` }}
                >
                  <Button>{item}</Button> 
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default Test;
