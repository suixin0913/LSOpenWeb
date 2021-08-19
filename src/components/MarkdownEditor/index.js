import React from 'react';
import { Form, Modal, Button, Upload, message } from 'antd';
import SimpleMDEEditor from '../../plugin/markdown-editor';
// import 'yt-simplemde-editor/dist/style.css';
import marked from 'marked';
import Prism from 'prismjs';
import 'antd/dist/antd.css'
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    xs: { span: 0 },
    sm: { span: 0 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24},
  },
};

const uploadUrl = 'https://staging-manager.listenai.com/docs/doc_infos/upload_image';
const progressText = '![Uploading file {uid}...]()';
const urlText = '![file]({filename})';

marked.setOptions({
  headerIds: false,
  gfm: true,
  breaks: true,
  highlight (code, lang) {
    if (lang) {
      const language = lang.toLowerCase();
      const grammar = Prism.languages[language];
      if (grammar) {
        return Prism.highlight(code, grammar, language);
      }
    }

    return code;
  }
});

class Editor extends React.Component {

  state = {
    uploadVisible: false, // 本地上传
    isError:false
  };
  constructor(props){
    super(props)
  }
  getValue = ()=>{
    const val = this.simplemde.value()
    if(!val){
      this.setState({isError:true})
      return ''
    }
    this.setState({isError:false})
    return val
  }



  renderMarkdown = text => {
    let html = marked(text);
    return html
  };
  closeImgModal(v){
    this.setState({uploadVisible:v})
  }
  clear(){
    this.simplemde.clearAutosavedValue();
  }
  componentUnMount(){
    this.simplemde.clearAutosavedValue();
  }
  render () {
    const {placeholder,change,blur} = this.props
    const editorProps = {
      getMdeInstance: simplemde => {
        this.simplemde = simplemde;
      },
      options: {
        placeholder:placeholder,
        spellChecker: false,
        forceSync: true,
        autosave: {
          enabled: false,
          delay: 5000,
          uniqueId: `article_content`,
        },
        previewRender: this.renderMarkdown,
        tabSize: 4,
        toolbar: [
          'bold',
          'italic',
          'heading',
          '|',
          'quote',
          'code',
          'table',
          'horizontal-rule',
          'unordered-list',
          'ordered-list',
          '|',
          'link',
          {
            name: 'image',
            action: () => {
              this.closeImgModal( true )
            },
            className: 'fa fa-image',
            title: '上传图片',
          },
          '|',
          'preview',
          'side-by-side',
          'fullscreen',
          '|',
          'guide'
        ],
      },
      uploadOptions: {
        action: uploadUrl,
        jsonName: 'url', // 服务端响应格式 {"data":{"fileUrl":"http:\/\/api.blog.test\/storage\/tmp\/w9jfWHWUUuiaeqYAl7K1PhBBRgzamCv20ScdW1mn.png"}}
        // withCredentials: true,
        beforeUpload (file) {
          const isLt2M = file.size / 1024 / 1024 < 2;
          if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
          }
          return isLt2M;
        },
        headers: {
          'Accept': 'application/json'
        },
        onError (err, response) {
          if (response.message) {
            message.error(response.message);
          }
        },
      },
      onChange:(v) => { change(v) },
      onBlur:(v) => { blur(v) }
    };

    const uploadProps = {
      action: uploadUrl,
      name: 'file',
      multiple: true,
      showUploadList: false,
      beforeUpload: file => {
        const text = progressText.replace('{uid}', file.uid);
        this.simplemde.codemirror.replaceSelection(text);
        file.insertText = text;
      },
      headers: {
        Accept: 'application/x.sheng.v2+json',
        authorization: 'authorization-text',
      },
      onChange: ({ file }) => {
        if (file.status === 'done') {
          const { response: { url }, originFileObj } = file;
          const fileUrl = url
          const cursor = this.simplemde.codemirror.getCursor();
          const newValue = urlText.replace('{filename}', fileUrl);
          const text = this.simplemde.codemirror.getValue().replace(originFileObj.insertText, newValue);
          this.simplemde.codemirror.setValue(text);
          cursor.ch += newValue.length - progressText.length;
          this.simplemde.codemirror.setCursor(cursor);
          this.simplemde.codemirror.focus();
          originFileObj.insertText = newValue;
        }

        if (file.status === 'error') {
          const { response: { message: msg }, originFileObj } = file;
          message.error(msg);
          const text = this.simplemde.codemirror.getValue().replace(originFileObj.insertText, '');
          this.simplemde.codemirror.setValue(text);
        }

        this.setState({ uploadVisible: false });
      },
    };

    return (
      <div className="normal">
        <Form >
            <FormItem {...formItemLayout}  >
                <SimpleMDEEditor {...editorProps} />
                {this.state.isError ? (<p style={{color:'#f34',margin:0,height:'20px',lineHeight:'20px'}}>请输入反馈内容!</p> ): '' }
            </FormItem>
            <FormItem
            wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: { span: 16, offset: 8 },
            }}
        >
        </FormItem>
        </Form>
        <Modal
          title="插入图片"
          visible={this.state.uploadVisible}
          footer={null}
          centered={true}
          onCancel={()=>this.closeImgModal(false)}
        >
          <Upload {...uploadProps}>
            <Button type="primary">
                点击上传
            </Button>
          </Upload>
        </Modal>
      </div>
    )
  }
}

export default Editor;
