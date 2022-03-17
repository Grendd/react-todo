import React from 'react';

import './Error.scss'

interface ErrorProps {
    message: string;
}
const Error = ({message}: ErrorProps) => {

    return (
        <div className="error">
            {message}
        </div>
    )
}

export default Error