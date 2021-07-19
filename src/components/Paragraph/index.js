import React from 'react';
import './style.css';
import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

function Paragraph({
    desc,
    title,
    children,
    ...props
}) {

    return (
        <div className="paragraph">
            <div className="paragraph__head">
                <p className="paragraph__head__title">{title}</p>
                <p className="paragraph__head__desc">{desc}</p>
            </div>
            {children}
        </div>
    );
}

export default Paragraph;