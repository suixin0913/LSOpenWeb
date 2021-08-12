import React, {Component} from 'react'
import 'gitalk/dist/gitalk.css'
import Gitalk from 'gitalk'

class GitalkComment extends Component{
  componentDidMount(){
    var gitalk = new Gitalk({
      clientID: 'fd95abfd4678ed4cf090',
      clientSecret: 'e43ec541cc82dcbc5bbb58a5ce9e0e00c00dc620',
      repo: 'LSOpenWeb',  // 仓库名称
      owner: 'LISTENAI',      // 仓库作者
      admin: ['monsterboom'],
      id: location.pathname,      // Ensure uniqueness and length less than 50
      distractionFreeMode: false  // Facebook-like distraction free mode
    })
    
    gitalk.render('gitalk-container')
  }
  render(){
    return (
        <div id="gitalk-container"></div>
    )
  }
}
export default GitalkComment;