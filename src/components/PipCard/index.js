import React from 'react';
import './style.css';
import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

function PipCard({
    icon,
    title,
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
        </div>
    );
}

export default PipCard;