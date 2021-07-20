import React from 'react';
import './style.css';
import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

function PipCard({
    icon,
    title,
    pipes = [],
    btns = [],
    ...props
}) {
    const sources = {
        light: useBaseUrl(icon.src),
        dark: useBaseUrl(icon.srcDark || icon.src),
    };

    return (
        <div className="pip-card">
            <div className="pip-card__title">
                <ThemedImage
                    sources={sources}
                />
                <span>{title}</span>
            </div>
            <div className="pip-card__links">
                <div className="pip-card__links__pips">
                    {
                        pipes.map((pipe, index) => (
                            <div className="pip-card__links__pips__item" key={index}>
                                {
                                    index > 0 ? 
                                    (<ThemedImage
                                        sources={{
                                            light: useBaseUrl('img/r_arrow_right_light.svg'),
                                            dark: useBaseUrl('img/r_arrow_right_dark.svg'),
                                        }}
                                    />) : (<></>)
                                }
                                <a className="pip-card__links__pips__item__link" key={index} href={useBaseUrl(pipe.to)}>{index+1}.{pipe.label}</a>
                            </div>
                        ))
                    }
                </div>
                <div className="pip-card__links__btns">
                    {
                        btns.map((btn, index) => (
                            <a className="pip-card__links__btns__item" key={index} href={useBaseUrl(btn.to)}>{btn.label}</a>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default PipCard;