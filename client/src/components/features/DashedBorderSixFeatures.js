import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
//eslint-disable-next-line
import { css } from "styled-components/macro";


import defaultCardImage from "../../images/shield-icon.svg";

import { ReactComponent as SvgDecoratorBlob3 } from "../../images/svg-decorator-blob-3.svg";


const Container = tw.div`relative pt-0`;

const ThreeColumnContainer = styled.div`
  ${tw`flex flex-col pt-0 md:pt-0 pb-20 items-center md:items-stretch md:flex-row flex-wrap md:justify-center max-w-screen-xl mx-auto `}
`;
// const Heading = tw(SectionHeading)`w-full`;

const Column = styled.div`
  ${tw`md:w-1/2 lg:w-1/3 px-6 flex`}
`;

const Card = styled.div`
  ${tw`bg-primary-500 flex flex-col mx-auto max-w-xs items-center px-6 py-10 border-2 border-solid border-primary-500 rounded-lg mt-12`}
  .imageContainer {
    ${tw`bg-white border-2 border-primary-100 text-center rounded-full p-6 flex-shrink-0 relative`}
    img {
      ${tw`w-16 h-16`}
    }
  }

  .field_value {
    ${tw`mt-4 mb-0 text-red-600 text-2xl font-bold tracking-widest`}
  }

  .textContainer {
    ${tw`mt-4 text-white text-center`}
  }

  .title {
    ${tw`mt-2 font-bold text-xl leading-none text-white`}
  }

  .description {
    ${tw`mt-3 font-semibold text-secondary-100 text-sm leading-loose`}
  }
`;

const DecoratorBlob = styled(SvgDecoratorBlob3)`
  ${tw`pointer-events-none absolute right-0 bottom-0 w-64 opacity-25 transform translate-x-32 translate-y-48 `}
`;

export default ({ cards = null }) => {
  /*
   * This componets has an array of object denoting the cards defined below. Each object in the cards array can have the key (Change it according to your need, you can also add more objects to have more cards in this feature component):
   *  1) imageSrc - the image shown at the top of the card
   *  2) title - the title of the card
   *  3) description - the description of the card
   *  If a key for a particular card is not provided, a default value is used
   */

  // const cards = [
  //   {
  //     imageSrc: ShieldIconImage,
  //     title: "Ads Management",
  //     description: "We create and manage ads that you need, from creation to deployment. Lorem ipsum donor sit amet consicou."
  //   },
  //   {title: "Video Marketing" },
  //   { imageSrc: CustomizeIconImage, title: "Customer Relation" },
  //   { imageSrc: ReliableIconImage, title: "Product Outreach" },
  //   { imageSrc: FastIconImage, title: "PR Campaign" },
  //   { imageSrc: SimpleIconImage, title: "Product Expansion" }
  // ];

  return (
    <Container>
      <ThreeColumnContainer>
        {/* <Heading>Our Professional <span tw="text-primary-500">Services</span></Heading> */}
        {cards.map((card, i) => (
          <Column key={i}>
            <Card>
              <span className="imageContainer">
                <img src={card.imageSrc || defaultCardImage} alt="" />
              </span>
              <span className="field_value">{card.field_value}</span>
              <span className="textContainer">
                <span className="title">{card.title || "Fully Secure"}</span>
                <p className="description">
                  {card.description ||
                    "Lorem ipsum donor amet siti ceali ut enim ad minim veniam, quis nostrud. Sic Semper Tyrannis. Neoas Calie artel."}
                </p>
              </span>
            </Card>
          </Column>
        ))}
      </ThreeColumnContainer>
      <DecoratorBlob />
    </Container>
  );
};
