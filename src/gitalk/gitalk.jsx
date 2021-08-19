// 登录 去创建issue
//未登录 也是创建issue 不要comment
//issue 标题： 文档反馈： issue内容前4个字 
//issue内容 加上反馈的文档链接

import React, { Component } from 'react'
import  { Modal } from 'antd'

import autosize from 'autosize'

import { Popover } from 'antd';
import i18n from './i18n'
import './style/gitalk.css'
import {
  queryParse,
  queryStringify,
  axiosJSON,
  axiosGithub,
  formatErrorMsg,
} from './util'
import Avatar from './component/avatar'
import Button from './component/button'
import MarkdownEditor from '../components/MarkdownEditor'

import { GT_ACCESS_TOKEN, GT_COMMENT,LS_MANAGER_URL } from './const'
import qrcodeImg from './assets/ls-qrcode.jpeg'
import axios from 'axios'
 const axiosLsmanger = axios.create({
  baseURL: LS_MANAGER_URL,
  headers: {
    'Accept': 'application/json'
  }
})
class GitalkComponent extends Component {
  state = {
    user: null,
    issue: null,
    comments: [],
    localComments: [],
    comment: '',
    page: 1,
    pagerDirection: 'last',
    cursor: null,

    isNoInit: false,
    isIniting: true,
    isCreating: false,
    isLoading: false,
    isIssueCreating: false,
    isIssueCreatingNologin:false,
    isInputFocused: false,
    qrcodeImg:qrcodeImg,
    isOccurError: false,
    errorMsg: '',
    tipVisible:false
  }
  constructor (props) {
    super(props)
    console.log('进来没啊')
    this.options = Object.assign({}, {
      id: window.location.href,
      number: -1,
      labels: ['Gitalk'], //issuse 标签
      title:window.document.title,//issuse name
      body: '', // window.location.href + header.meta[description]
      language: window.navigator.language || window.navigator.userLanguage,
      pagerDirection: 'last', // last or first
      createIssueManually: false,
      distractionFreeMode: false,
      proxy: 'https://cors-anywhere.azm.workers.dev/https://github.com/login/oauth/access_token',
      flipMoveOptions: {
        staggerDelayBy: 150,
        appearAnimation: 'accordionVertical',
        enterAnimation: 'accordionVertical',
        leaveAnimation: 'accordionVertical',
      },
      enableHotKey: true,
      url: window.location.href,
      defaultAuthor: {
        avatarUrl: '//avatars1.githubusercontent.com/u/29697133?s=50',
        login: 'null',
        url: '',
      },
      updateCountCallback: null,
      qrcodeVisible:false
    }, props.options)
    this.state.pagerDirection = this.options.pagerDirection
    const storedComment = window.localStorage.getItem(GT_COMMENT)
    if (storedComment) {
      this.state.comment = decodeURIComponent(storedComment)
      window.localStorage.removeItem(GT_COMMENT)
    }
    window.localStorage.removeItem('smde_article_content')
    const query = queryParse()
    if (query.code) {
      const code = query.code
      delete query.code
      const replacedUrl = `${window.location.origin}${window.location.pathname}${queryStringify(query)}${window.location.hash}`
      history.replaceState(null, null, replacedUrl)
      this.options = Object.assign({}, this.options, {
        url: replacedUrl,
        id: replacedUrl
      }, props.options)

      axiosJSON.post(this.options.proxy, {
        code,
        client_id: this.options.clientID,
        client_secret: this.options.clientSecret
      }).then(res => {
        if (res.data && res.data.access_token) {
          this.accessToken = res.data.access_token
          this.getInit()
            .then(() => this.setState({ isIniting: false }))
            .catch(err => {
              console.log('err:', err)
              this.setState({
                isIniting: false,
                isOccurError: true,
                errorMsg: formatErrorMsg(err)
              })
            })
        } else {
          // no access_token
          console.log('res.data err:', res.data)
          this.setState({
            isOccurError: true,
            errorMsg: formatErrorMsg(new Error('no access token'))
          })
        }
      }).catch(err => {
        console.log('err: ', err)
        this.setState({
          isOccurError: true,
          errorMsg: formatErrorMsg(err)
        })
      })
    } else {
      console.log('这里')
      this.getUserInfo().then(()=>this.setState({ isIniting: false }))
    }

    this.i18n = i18n(this.options.language)
  }
  componentDidUpdate () {
    this.commentEL && autosize(this.commentEL)
  }
  get accessToken () {
    return this._accessToken || window.localStorage.getItem(GT_ACCESS_TOKEN)
  }
  set accessToken (token) {
    window.localStorage.setItem(GT_ACCESS_TOKEN, token)
    this._accessToken = token
  }
  get loginLink () {
    const githubOauthUrl = 'https://github.com/login/oauth/authorize'
    const { clientID } = this.options
    const query = {
      client_id: clientID,
      redirect_uri: window.location.href,
      scope: 'public_repo'
    }
    return `${githubOauthUrl}?${queryStringify(query)}`
  }
  get isAdmin () {
    const { admin } = this.options
    const { user } = this.state
    return user && ~[].concat(admin).map(a => a.toLowerCase()).indexOf(user.login.toLowerCase())
  }

  getInit () {
    return this.getUserInfo()
  }
  getUserInfo () {
    if (!this.accessToken) {
      return new Promise(resolve => {
        resolve()
      })
    }
    return axiosGithub.get('/user', {
      headers: {
        Authorization: `token ${this.accessToken}`
      }
    }).then(res => {
      this.setState({ user: res.data })
    }).catch(err => {
      this.logout()
    })
  }
  getIssueById () {
    const { owner, repo, number, clientID, clientSecret } = this.options
    const getUrl = `/repos/${owner}/${repo}/issues/${number}`

    return new Promise((resolve, reject) => {
      axiosGithub.get(getUrl, {
        auth: {
          username: clientID,
          password: clientSecret
        },
        params: {
          t: Date.now()
        }
      })
        .then(res => {
          let issue = null

          if (res && res.data && res.data.number === number) {
            issue = res.data

            this.setState({ issue, isNoInit: false })
          }
          resolve(issue)
        })
        .catch(err => {
          // When the status code is 404, promise will be resolved with null
          if (err.response.status === 404) resolve(null)
          reject(err)
        })
    })
  }
  getIssueByLabels () {
    const { owner, repo, id, labels, clientID, clientSecret } = this.options

    return axiosGithub.get(`/repos/${owner}/${repo}/issues`, {
      auth: {
        username: clientID,
        password: clientSecret
      },
      params: {
        labels: labels.concat(id).join(','),
        t: Date.now()
      }
    }).then(res => {
      const { createIssueManually } = this.options
      let isNoInit = false
      let issue = null
      if (!(res && res.data && res.data.length)) {
        if (!createIssueManually && this.isAdmin) {
          return this.createIssue()
        }

        isNoInit = true
      } else {
        issue = res.data[0]
      }
      this.setState({ issue, isNoInit })
      return issue
    })
  }
  getIssue () {
    const { number } = this.options
    const { issue } = this.state
    if (issue) {
      this.setState({ isNoInit: false })
      return Promise.resolve(issue)
    }

    if (typeof number === 'number' && number > 0) {
      return this.getIssueById().then(resIssue => {
        if (!resIssue) return this.getIssueByLabels()
        return resIssue
      })
    }
    return this.getIssueByLabels()
  }
  // 匿名创建issue
  createIssueNoLogin () {
    const {  id, url } = this.options
    return  axiosLsmanger.post('/docs/doc_infos/issue_comment', {
            title:`文档反馈：${id}`,
            labels: [],
            comment:  `[文档链接](${url}) \n ${
              this.state.comment
            }`
      })
      .then(res => {
        this.setState({ issue: res.data })
        return res.data
      })
  }

  createIssue () {
    const { owner, repo, id, url } = this.options
    return axiosGithub.post(`/repos/${owner}/${repo}/issues`, {
      title:`文档反馈：${id}`,
      // labels: labels.concat(id),
      labels: [],
      body: `[文档链接](${url}) \n ${
        this.state.comment
      }`
    }, {
      headers: {
        Authorization: `token ${this.accessToken}`
      }
    }).then(res => {
      this.setState({ issue: res.data })
      return res.data
    })
  }


  logout () {
    this.setState({ user: null })
    window.localStorage.removeItem(GT_ACCESS_TOKEN)
  }
  getRef = e => {
    this.publicBtnEL = e
  }
  getEditorComments= () =>{
    this.commentEL.getValue();
  }
  showQrcode= () => {
    this.setState({qrcodeVisible:true})
  }
  handleLogin = () => {
    const { comment } = this.state
    window.localStorage.setItem(GT_COMMENT, encodeURIComponent(comment))
    window.location.href = this.loginLink
  }
  // 匿名创建
  handleIssueCreateNoLogin =()=>{
    console.log('匿名创建issue')
    const {closeHandle} = this.options
    this.getEditorComments()
    if (!this.state.comment.length) {
      return
    }
    this.setState({ isIssueCreatingNologin: true })
    this.createIssueNoLogin().then(issue => {
      this.setState({
        isIssueCreatingNologin: false,
        isOccurError: false,
        tipVisible:true
      })
      closeHandle()
    }).catch(err => {
      this.setState({
        isIssueCreatingNologin: false,
        isOccurError: true,
        errorMsg: formatErrorMsg(err),
      })
    }).then(res => {
      if (res) {
        this.setState({
          isNoInit: false,
        })
      }
    })
  }
  handleIssueCreate = () => {
    const {closeHandle} = this.options
    this.getEditorComments()
    if (!this.state.comment.length) {
      return
    }
    this.setState({ isIssueCreating: true })
    this.createIssue().then(issue => {
      this.setState({
        isIssueCreating: false,
        isOccurError: false,
        tipVisible:true,
      })
      closeHandle()
    }).catch(err => {
      this.setState({
        isIssueCreating: false,
        isOccurError: true,
        errorMsg: formatErrorMsg(err)
      })
    }).then(res => {
      if (res) {
        this.setState({
          isNoInit: false,
        })
      }
    })
  }

  handleCommentChange = e => this.setState({ comment: e })
  handleCommentBlur = (e) => {
    this.getEditorComments()
  }

  handleLogout = () => {
    this.logout()
    window.location.reload()
  }

  initing () {
    return <div className="gt-initing">
      <i className="gt-loader"/>
      <p className="gt-initing-text">{this.i18n.t('init')}</p>
    </div>
  }
  noInit () {
    const { user, isIssueCreating } = this.state
    const { owner, repo, admin } = this.options
    return (
      <div className="gt-no-init" key="no-init">
        <p dangerouslySetInnerHTML={{
          __html: this.i18n.t('no-found-related', {
            link: `<a href="https://github.com/${owner}/${repo}/issues">Issues</a>`
          })
        }}/>
        <p>{this.i18n.t('please-contact', { user: [].concat(admin).map(u => `@${u}`).join(' ') })}</p>
        {this.isAdmin ? <p>
          <Button onClick={this.handleIssueCreate} isLoading={isIssueCreating} text={this.i18n.t('init-issue')} />
        </p> : null}
        
        {/* {!user && <Button onClick={this.handleIssueCreateNoLogin}  isLoading={isIssueCreating} text={this.i18n.t('init-issue-nologin')} />}
        &nbsp;&nbsp; */}
        {!user && <Button className="gt-btn-login" onClick={this.handleLogin} text={this.i18n.t('login-with-github')} />}
      </div>
    )
  }
  header () {
    const { user, isIssueCreating ,isIssueCreatingNologin} = this.state
    return (
      <div className="gt-header" key="header">
        {/* {user ?
          <Avatar className="gt-header-avatar" src={user.avatar_url} alt={user.login} /> : <Avatar className="gt-header-avatar" />
        } */}
        <div className="gt-header-comment">
          <MarkdownEditor  
            ref={t => { this.commentEL = t }} 
            change={this.handleCommentChange}
            blur={this.handleCommentBlur}
            placeholder={this.i18n.t('leave-a-comment')}
          /> 
                      
          <div className="gt-header-controls">
            <Popover content={  <img src={qrcodeImg} alt="" className="qrcodeImg" />}>
              <a className="gt-header-controls-tip"  rel="noopener noreferrer" >
                扫码加群交流
              </a>
            </Popover>
            {user && <Button
              getRef={this.getRef}
              className="gt-btn-public"
              onClick={this.handleIssueCreate}
              text={this.i18n.t('comment')}
              isLoading={isIssueCreating}
            />}

         
            {!user && <Button className="gt-btn-login" onClick={this.handleLogin} text={this.i18n.t('login-with-github')} />}
            <Button
              className="gt-btn-preview"
              onClick={this.handleIssueCreateNoLogin}
              isLoading={isIssueCreatingNologin}
              text='匿名发表'
              // isLoading={isPreviewing}
            />
          </div>
        </div>
      </div>
    )
  }

  hideTipModal(){
    this.setState({tipVisible:false})
  }

  render () {
    const { isIniting, isOccurError, errorMsg, isInputFocused,tipVisible } = this.state
    // console.log('看全部',this.state)
    return (
      <div className={`gt-container${isInputFocused ? ' gt-input-focused' : ''}`}>
        {isIniting && this.initing()}
      
        {isOccurError && <div className="gt-error">
          {errorMsg}
        </div>}
         {!isIniting && (
            [
              this.header()
            ])
          }
          <Modal  
            visible={tipVisible}    
            onCancel={this.hideTipModal.bind(this)}
            className="tips-modal"
            footer={[
              <Button onClick={this.hideTipModal.bind(this)} text="知道了" className="tip-btn"/>
            ]}
          >
            <h3><i className="icon right-icon" onClick={this.closeModal}></i>感谢您的反馈！</h3>
            <p>我们会尽快处理您的问题</p>
          </Modal>
      
      </div>
    )
  }
}

export default GitalkComponent;
