import React, {Component} from 'react'
import {Modal ,message} from 'antd'

import 'gitalk/dist/gitalk.css'
import '../gitalk/index.css'
import Gitalk from '../gitalk'

import axios from 'axios'
 const axiosLsmanger = axios.create({
  baseURL: 'https://staging-manager.listenai.com/',
  headers: {
    'Accept': 'application/json'
  }
})
class GitalkComment extends Component{
  state = {
    likeNum:0,
    unlikeNum:0,
    gitalkVisble:false,
    gitalk:null
  }
  constructor(props){
    super(props)
  }
  componentDidMount(){
    const self = this;
    var gitalk = new Gitalk({
      clientID: 'fd95abfd4678ed4cf090',
      clientSecret: 'e43ec541cc82dcbc5bbb58a5ce9e0e00c00dc620',
      repo: 'LSOpenWeb',  // 仓库名称
      owner: 'LISTENAI',      // 仓库作者
      admin: ['monsterboom'],
      id: location.pathname,      // Ensure uniqueness and length less than 50
      distractionFreeMode: false,  // Facebook-like distraction free mode
      showComments:false,
      createIssueManually :true,
      closeHandle:()=>{self.setState({gitalkVisble:false})}
    })
    const likeStr = window.localStorage.getItem(location.pathname);
    let hasLike,hasUnlike,hasOprate=false;
    if(likeStr){
      const likeData = JSON.parse(likeStr);
      hasLike = likeData.hasLike;
      hasUnlike = likeData.hasUnlike;
      hasOprate = likeData.hasOprate;
    }
    this.setState({
      gitalk:gitalk,
      hasLike,
      hasOprate,
      hasUnlike
    })
    this.getDocInfo();
  }
  closeModal(){
    this.setState({})
  }
  closeGitalkModal(){
    this.setState({gitalkVisble:false})
  }
  showGitalkModal(){
    const self = this;
    this.setState({gitalkVisble:true})
    setTimeout(function () {
      self.state.gitalk ? self.state.gitalk.render('gitalk-container') : null;
    })
  }
  setlocalSession(key,value){

  }
 getDocInfo() {
   const self = this;
   axiosLsmanger.get(`/docs/doc_infos`,{params:{key:location.pathname}})
    .then(function (response) {
      self.setState({
        likeNum : response.data.like,
        unlikeNum : response.data.unlike
      })
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  cancelLike(type){
    const self = this;
    axiosLsmanger.post(`/docs/doc_infos/record_remove`,{
        key:location.pathname,
        type:type
    })
    .then(function (response) {
      window.localStorage.setItem(location.pathname,JSON.stringify({
        hasLike:false,
        hasUnlike:false,
        hasOprate:false
      }))
      self.setState({
        likeNum : response.data.like,
        unlikeNum : response.data.unlike,
        hasLike:false,
        hasUnlike:false,
        hasOprate:false
      })
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  likeDoc(type){
    const self = this;
    axiosLsmanger.post(`/docs/doc_infos/record`,{
      key:location.pathname,
      type:type
  })
    .then(function (response) {
      // this.getDocInfo();
      window.localStorage.setItem(location.pathname,JSON.stringify({
        hasLike:type==='like',
        hasUnlike:type==='unlike',
        hasOprate:true
      }))
      self.setState({
        likeNum : response.data.like,
        unlikeNum : response.data.unlike,
        hasLike:type==='like',
        hasUnlike:type==='unlike',
        hasOprate:true
      })
    })
    .catch(function (error) {
      console.log(error);
    });
    if(type==='unlike'){
      this.showGitalkModal()
    }
  }
  likeDocHandle(type) {
   const self = this;
   const {hasUnlike,hasOprate,hasLike} = this.state
   if(type === 'like'){
     //点赞 没有操作过 
     if(!hasOprate ){
        this.setState({acting:true})
        setTimeout(function () {
          self.setState({acting:false}) 
        },600)
        self.likeDoc(type)
     }else{
       //已经点赞过，取消点赞
       if(hasLike){
          //取消点赞
          self.cancelLike(type)
          console.log('取消点赞')
       }else{
         message.info('你已经踩过了喔')
       }
     }
   }else if(type === 'unlike'){
    //点踩 没有操作过 
    if(!hasOprate ){
       this.setState({unlikeActing:true})
       setTimeout(function () {
         self.setState({unlikeActing:false}) 
       },600)
       self.likeDoc(type)
    }else{
      //已经点踩过，取消点踩
      if(hasUnlike){
         //取消点踩
         self.cancelLike(type)
      }else{
        message.info('你已经赞过了喔')
      }
      }
    }else{
      return
    }

 
    }
  commentDoneHandle(){
    this.state.gitalkVisble = false;
  }

  render(){
    const {gitalkVisble,likeNum,unlikeNum,acting,unlikeActing ,hasLike,hasUnlike} = this.state;
    return (
        <div className="gitalk-wrapper">
            <ul className="gitalk-option">
              <li  onClick={()=>{this.likeDocHandle('like')}} className={`like ${hasLike ? 'hover' : ''}`}><i className= {`icon like-icon ${acting ?"bounce-up":''}`} ></i> <span id="like_num">有帮助  {likeNum}</span></li>
              <li  onClick={()=>{this.likeDocHandle('unlike')}}  className={`unlike ${hasUnlike ? 'hover' : ''}`}><i className={`icon unlike-icon ${unlikeActing ?"bounce-down":''}`} ></i> <span id="unlike_num">没帮助 {unlikeNum}</span></li>
              <li onClick={this.showGitalkModal.bind(this)} >文档反馈{gitalkVisble}</li>
            </ul>
            <Modal title="文档意见反馈"  width="640px" visible={gitalkVisble} footer={null}  destroyOnClose={true} maskClosable={false} onCancel={this.closeGitalkModal.bind(this)}>
              <div id="gitalk-container" className="gitalk-container"></div>
            </Modal>
            {/* <div className={`gitalk-modal  ${gitalkVisble ?"show":''}`}>
              <div className="gitalk-modal-container">
                <h2>文档意见反馈 <i className="icon icon-close" onClick={this.closeGitalkModal.bind(this)}></i></h2>
                
              </div>
            </div> */}
        </div>
    )
  }
}
export default GitalkComment;