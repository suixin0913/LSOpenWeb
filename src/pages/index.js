import React from 'react';
import LayoutProviders from '@theme/LayoutProviders';
import Navbar from '@theme/Navbar';
import PipCard from '../components/PipCard';
import Paragraph from '../components/Paragraph';
import useBaseUrl from '@docusaurus/useBaseUrl';
import ThemedImage from '@theme/ThemedImage';
import './style.css';

function Hello() {

    const hotSearch = [
        {
            label: 'SDK',
            to: useBaseUrl('/')
        },
        {
            label: '芯片选型',
            to: useBaseUrl('/')
        }
    ]

    const collections = [
        {
            title: '热门链接',
            items: [
                [
                    {
                        label: '芯片选型指南'
                    },
                    {
                        label: '语音交互设计指南'
                    },
                    {
                        label: '入门教程'
                    }
                ],
                [
                    {
                        label: '命令词选择'
                    },
                    {
                        label: 'LISA'
                    },
                    {
                        label: 'SDK quick start'
                    }
                ]
            ]
        },
        {
            title: '常见FAQ',
            items: [
                [
                    {
                        label: '无法编译'
                    },
                    {
                        label: '如何更换命令词'
                    },
                    {
                        label: '3002和4002的功能区别'
                    }
                ],
                [
                    {
                        label: '无法使用LStudio'
                    },
                    {
                        label: '如何做效果调优'
                    },
                    {
                        label: '如何自定义串口逻辑'
                    }
                ]
            ]
        }
    ]

    const collectionBlock = (block, index) => {
        return (
            <div key={'block'+index} className="collection-block">
                <p className="collection-block__title">{block.title}</p>
                <div className="collection-block__block">
                    {
                        block.items.map((list, index) => (
                            <ul key={'list'+index}>
                                {
                                    list.map((item, index) => (
                                        <li key={index}>
                                            <span className="r_arrow__link">{item.label}</span> 
                                        </li>
                                    ))
                                }
                            </ul>
                        ))
                    }
                </div>
            </div>
        )
    }

    return (
        <LayoutProviders title="Hello">
            <Navbar />
            <div>
                <div className="main">
                    <p className="main__title">聆思文档中心</p>
                    <p className="main__desc">您可以在这里找到最新有关聆思芯片的产品和技术资源，以及方案开发教程。</p>
                    <div className="main__search">
                        <input placeholder="搜索你的问题" />
                        <ThemedImage
                            className="main__search__prefix"
                            sources={{
                                light: useBaseUrl('img/r_search.svg'),
                                dark: useBaseUrl('img/r_search.svg'),
                            }}
                        />
                    </div>
                    <div>
                        <p className="main__quicklink">
                            <span>热门搜索：</span>
                            {
                                hotSearch.map((item, index) => (
                                    <a className="main__link" key={index} href={item.to}>{item.label}</a>
                                ))
                            }
                        </p>
                    </div>
                    <div>
                        <a className="main__btn">芯片选型</a>
                        <a className="main__btn">快速入门</a>
                        <a className="main__btn">离线语音开发</a>
                    </div>
                </div>

                <div className="collection" style={{marginBottom: '100px'}}>
                    {
                        collections.map((item, index) => {
                            return collectionBlock(item, index)
                        })
                    }
                </div>

                <Paragraph title="AI应用方案" desc="快速上手语音交互、通话降噪等AI应用开发">
                    <PipCard {...{
                        icon: {
                            src: 'img/h_interact_light.svg',
                            srcDark: 'img/h_interact_dark.svg'
                        },
                        title: '离线语音交互'
                    }} />
                    <PipCard {...{
                        icon: {
                            src: 'img/h_noise_light.svg',
                            srcDark: 'img/h_noise_dark.svg'
                        },
                        title: '通话降噪'
                    }} />
                    <PipCard {...{
                        icon: {
                            src: 'img/h_voice_light.svg',
                            srcDark: 'img/h_voice_dark.svg'
                        },
                        title: 'DSP前端声学'
                    }} />
                </Paragraph>

                <Paragraph title="行业解决方案" desc="现成行业解决方案，供项目快速落地">
                    <PipCard {...{
                        icon: {
                            src: 'img/h_interact_light.svg',
                            srcDark: 'img/h_interact_dark.svg'
                        },
                        title: '离线语音交互'
                    }} />
                </Paragraph>
            
                <div className="dev-block">
                    <Paragraph title="开发专题" desc="各式各样的开发专题">
                        
                    </Paragraph>
                </div>
            
                <div className="index-footer">
                    <p>Copyright © 安徽聆思智能科技有限公司皖ICP备05001217号</p>
                </div>
            </div>
            
        </LayoutProviders>
    );
}

export default Hello;