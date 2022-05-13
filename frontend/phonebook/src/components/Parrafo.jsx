import styled, { css } from "styled-components";


const P = styled.p`

    font-weight: bold;
    font-size: 2rem;
    color: blueviolet;

${props => props.importante && css `background: Yellow`}


/* Aqui solo se modifican las "a"  que estan adentro de "p" y además adentro de un "div"
div {
    p {
        a{

        }
    }
} */

`

export default P;