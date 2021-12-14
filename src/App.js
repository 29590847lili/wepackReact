import React from 'react'
import { Button } from 'antd'
import Style from './app.module.scss'
const About = () => (
  <div>
    <h1 className={Style.app}>About Page</h1>
    <p>这是About页面111</p>
    <Button>button</Button>
  </div>
)

export default About