import React from 'react';
import Highlighter from 'react-highlight-words';

export interface MuiCustomHighlighterProps {
    text: string;
    query: string;
}

const MuiCustomHighlighter = (props: MuiCustomHighlighterProps) => {
    const { text = '', query = '' } = props;

    const reg = `^${query}`;

    return (
        <Highlighter
            autoEscape={false}
            searchWords={[reg]}
            textToHighlight={text}
            highlightClassName="u-text-highligh"
        />
    );
};

export { MuiCustomHighlighter };
