import React from 'react';
import LayoutProviders from '@theme/LayoutProviders';
import Navbar from '@theme/Navbar';
import PipCard from '../components/PipCard';
import Paragraph from '../components/Paragraph';
import useBaseUrl from '@docusaurus/useBaseUrl';
import ThemedImage from '@theme/ThemedImage';
import './style.css';

import MockData from './mock.json'

function Hello() {

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
                                            <a className="r_arrow__link" href={useBaseUrl(item.to)}>{item.label}</a> 
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
                    <p className="main__title">{MockData.title}</p>
                    <p className="main__desc">{MockData.description}</p>
                    <div className="main__search">
                        <input placeholder="搜索你的问题" onKeyPress={(event) => {
                            if(event.key === 'Enter'){
                                location.href = `/search?q=${event.target.value}`
                              }
                        }} />
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
                                MockData.hotSearch.map((item, index) => (
                                    <a className="main__link" key={index} href={useBaseUrl(item.to)}>{item.label}</a>
                                ))
                            }
                        </p>
                    </div>
                    <div>
                        {
                            MockData.hotSearchBtns.map((item, index) => (
                                <a className="main__btn" key={index} href={useBaseUrl(item.to)}>{item.label}</a>
                            ))
                        }
                    </div>
                </div>

                <div className="collection" style={{marginBottom: '100px'}}>
                    <div className="collection__content">
                        {
                            MockData.collections.map((item, index) => {
                                return collectionBlock(item, index)
                            })
                        }
                    </div>
                </div>

                {
                    MockData.paragraphs.map((paragraph, index) => (
                        <Paragraph title={paragraph.title} desc={paragraph.desc} key={index}>
                            {
                                paragraph.cards.map((pipe, index) => (
                                    <PipCard {...pipe} key={index} />
                                ))
                            }
                        </Paragraph>
                    ))
                }

                <div className="dev-block">
                    <Paragraph title="开发专题" desc="各式各样的开发专题">
                        <div className="dev-block__content">
                            {
                                MockData.projects.map((project, index) => (
                                    <a className="dev-block__link" key={index} href={useBaseUrl(project.to)}>
                                        {project.label}
                                    </a>
                                ))
                            }
                        </div>
                        
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