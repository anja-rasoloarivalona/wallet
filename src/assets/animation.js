const { keyframes } = require("styled-components");

const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(1rem);
    }

    to {
        opacity: 1;
        transform: translateY(0rem)
    }
`
export {
    fadeIn
}