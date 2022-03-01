import React from 'react';
import styled from 'styled-components';
import Document from './svg/document.svg';
import DownArrow from './svg/arrow-down.svg';
import RightArrow from './svg/arrow-right.svg';
import RightWhiteArrow from './svg/arrow-right-white.svg';

const CardStyles = styled.div`
  border: 1px solid lightgray;
  padding: 30px 50px;
  position: relative;
  color: #4a4a4a;
  h2 {
    /* making the font responsive with clamp */
    font-size: clamp(15px, 3vw, 40px);
  }
  p {
    font-size: clamp(12px, 3vw, 30px);
  }
  @media only screen and (max-width: 600px) {
    padding: 10px;
  }
  &:hover {
    /* transform: scale(1.01); */
    transform: translateY(-7px);

    transition: 0.25s;
    transition-timing-function: ease-out;
    filter: brightness(1.1);
  }
`;
const DocumentStyles = styled.div`
  display: flex;
  img {
    width: 30px;
    color: lightgray;
    margin-right: 10px;
    @media only screen and (max-width: 920px) {
      width: 20px;
      margin-right: 5px;
    }
  }
  p {
    font-size: clamp(10px, 3vw, 26px);
    color: #8f8f8f;
  }
  position: absolute;
  left: 50px;
  bottom: 30px;
  @media only screen and (max-width: 920px) {
    bottom: -10px;
    left: 45px;
  }
  @media only screen and (max-width: 500px) {
    bottom: -8px;
    left: 10px;
  }
`;

//changed the color of the arrows directly in their .svg files by using "fill"
const ArrowStyles = styled.div`
  width: 40px;
  position: absolute;
  right: 30px;
  bottom: 30px;
  @media only screen and (max-width: 1250px) {
    width: 25px;
    right: 15px;
    bottom: 5px;
  }
  &:hover {
    transform: scale(1.01);
    transition: 0.25s;
    transition-timing-function: ease-out;
    filter: brightness(1.25);
  }
`;

const ArrowBoxStyles = styled.div`
  background-color: #00766f;
  position: absolute;
  bottom: 0;
  right: 0;
  width: 35px;
  height: 35px;
  padding: 35px;
  @media only screen and (max-width: 1250px) {
    width: 25px;
    height: 25px;
    padding: 25px;
  }
  /* @media only screen and (max-width: 768px) {
    width: 20px;
    height: 20px;
    padding: 25px;
  } */
  @media only screen and (max-width: 600px) {
    background-color: transparent;
    padding: 0;
    width: 25px;
    right: 15px;
    bottom: 15px;
  }
  &:hover {
    transform: scale(1.01);
    transition: 0.25s;
    transition-timing-function: ease-out;
    filter: brightness(1.25);
  }
`;

function Card({ card }) {
  return (
    // prefixed card id with 'id' since CSS IDs cannot start with a number
    <CardStyles id={`id${card.id}`}>
      <h2>{card.title}</h2>
      <p>{card.description}</p>
      {card.documentSize && (
        <DocumentStyles>
          <img src={Document} alt='' />
          <p>PDF ({card.documentSize})</p>
        </DocumentStyles>
      )}
      {/* used a chained ternary operator to give logic for when to output a down/right/white arrow symbol*/}
      {card.documentSize ? (
        <ArrowStyles>
          <a href={card.link}>
            <img src={DownArrow} alt='down arrow' />
          </a>
        </ArrowStyles>
      ) : card.description ? (
        <ArrowBoxStyles>
          <a href={card.link}>
            <img src={RightWhiteArrow} alt='right white coloured arrow' />
          </a>
        </ArrowBoxStyles>
      ) : (
        <ArrowStyles>
          <a href={card.link}>
            <img src={RightArrow} alt='right arrow' />
          </a>
        </ArrowStyles>
      )}
    </CardStyles>
  );
}

export default Card;
