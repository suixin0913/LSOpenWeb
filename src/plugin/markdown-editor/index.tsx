import React from 'react';
// import SimpleMDE from 'simplemde';
import CodeMirror from 'codemirror';
import Upload, { Options as UploadOptions } from './plugins/Upload';
import 'simplemde/dist/simplemde.min.css';
import './style.css';

// const SimpleMDE: any = {}

export interface SimpleMDEEditorProps {
  id?: string;
  className?: string;
  label?: string;
  uploadOptions?: UploadOptions;
  getMdeInstance?: (simplemde: TSimpleMDE) => void;
  extraKeys?: CodeMirror.KeyMap;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
  options?: SimpleMDE.Options;
  escape?: any;
  Textcomplete?: any;
  CodemirrorEditor?: any;
}

export interface SimpleMDEEditorState {
  contentChanged: boolean,
}

export type TSimpleMDE = SimpleMDE & {
  toggleFullScreen: () => void,
  autosaveTimeoutId: number,
};

class SimpleMDEEditor extends React.Component<SimpleMDEEditorProps, SimpleMDEEditorState> {
  state: SimpleMDEEditorState = {
    contentChanged: false,
  };

  id: string = '';

  wrapperId: string = '';

  simplemde?: TSimpleMDE;

  upload?: Upload;

  textcomplete?: any;
  constructor(props: SimpleMDEEditorProps) {
    super(props);
    this.id = this.props.id || `simplemde-editor-${Date.now()}`;
    this.wrapperId = `${this.id}-wrapper`;
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      this.simplemde = this.createEditor();
      this.addEvents();
      this.addExtraKeys();
      this.getMdeInstance();
      const { uploadOptions } = this.props;
      if (uploadOptions) {
        this.upload = new Upload(this.simplemde.codemirror, uploadOptions);
      }
    }
  }

  componentWillReceiveProps(nextProps: SimpleMDEEditorProps) {
    if (this.simplemde) {
      const { contentChanged } = this.state;
      const { value } = nextProps;
      if (!contentChanged && typeof value !== "undefined" && value !== this.simplemde.value()) {
        this.simplemde.value(value);
      }
      this.setState({ contentChanged: false });
    }
  }

  componentWillUnmount() {
    if (this.upload) {
      this.upload.destroy();
    }

    if (this.textcomplete) {
      this.textcomplete.destroy();
    }

    if (this.simplemde) {
      /**
       * 如果不关闭全屏状态会导致页面无法滚动
       */
      if (this.simplemde.isFullscreenActive()) {
        this.simplemde.toggleFullScreen();
      }

      /**
       * 清除自动保存的定时器
       */
      if (this.simplemde.autosaveTimeoutId) {
        clearTimeout(this.simplemde.autosaveTimeoutId);
      }
    }

    // this.simplemde.clearAutosavedValue()
    this.removeEvents();
  }

  handleChange = (instance: any, changeObj: CodeMirror.EditorChange) => {
    this.simplemde && this.triggerChange(this.simplemde.value());
  };





  triggerChange = (value: string) => {
    const { onChange } = this.props;
    if (onChange) {
      this.setState({ contentChanged: true });
      onChange(value);
    }
  };

  getMdeInstance = () => {
    const { getMdeInstance } = this.props;
    if (getMdeInstance && this.simplemde) {
      getMdeInstance(this.simplemde);
    }
  };

  addExtraKeys = () => {
    // https://codemirror.net/doc/manual.html#option_extraKeys
    const { extraKeys } = this.props;
    if (extraKeys && this.simplemde) {
      this.simplemde.codemirror.setOption('extraKeys', extraKeys);
    }
  };

  removeEvents = () => {
    if (this.simplemde) {
      const { codemirror } = this.simplemde;
      codemirror.off('change', this.handleChange);
    }
  };
 handleBlur=()=>{
  const { onBlur } = this.props;
  const val = this.simplemde.value();
  if (onBlur) {
    onBlur(val)
  }
}
  addEvents = () => {
   
    if (this.simplemde) {
      const { codemirror } = this.simplemde;
      codemirror.on('change', this.handleChange);
      codemirror.on('blur', this.handleBlur);
    }
  };

  createEditor = (): TSimpleMDE => {
    const { value, options = {}} = this.props;
    const simpleMdeOptions = ({
      ...options,
      element: document.getElementById(this.id),
      initialValue: value,
    }) as SimpleMDE.Options;

    const simplemde = new SimpleMDE(simpleMdeOptions);

    // 同步自动保存的value
    const { autosave } = options;
    if (autosave && autosave.enabled === true && autosave.uniqueId) {
      const autoSaveValue = simplemde.value();
      if (autoSaveValue && autoSaveValue !== value) {
        this.triggerChange(autoSaveValue);
      }
    }

    return simplemde as TSimpleMDE;
  };


  render() {
    const { className, label } = this.props;
    return (
      <div id={this.wrapperId} className={className}>
        {label && <label htmlFor={this.id}>{label}</label>}
        <textarea id={this.id} />
      </div>
    );
  }
}

export default SimpleMDEEditor;
