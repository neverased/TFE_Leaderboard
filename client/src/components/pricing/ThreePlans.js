import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import {
  SectionHeading,
  Subheading as SubheadingBase,
} from "components/misc/Headings.js";
import { SectionDescription } from "components/misc/Typography.js";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts.js";
import { ReactComponent as SvgDecoratorBlob } from "images/svg-decorator-blob-6.svg";
import { Link } from "react-router-dom";

const HeaderContainer = tw.div`mt-1 w-full flex flex-col items-center`;
const Subheading = tw(SubheadingBase)`mb-4`;
const Heading = tw(SectionHeading)`w-full`;
const Description = tw(SectionDescription)`w-full text-center`;

const PlansContainer = styled.div`
  ${tw`flex justify-between flex-col lg:flex-row items-center lg:items-stretch relative`}
  .div0 {
    ${tw`order-2 md:order-1`}
  }
  .div1 {
    ${tw`order-1 md:order-2`}
  }
  .div2 {
    ${tw`order-3 md:order-3`}
  }
`;
const Plan = styled.div`
  ${tw`w-full max-w-sm mt-16 lg:mr-8 lg:last:mr-0 text-center px-8 rounded-lg shadow relative pt-2 text-gray-900 bg-white flex flex-col`}
  .planHighlight {
    ${tw`rounded-t-lg absolute top-0 inset-x-0 h-2`}
  }
`;

const PlanHeader = styled.div`
  ${tw`flex flex-col uppercase leading-relaxed py-8`}
  .name {
    ${tw`font-bold text-xl`}
  }
  .price {
    ${tw`font-bold text-4xl sm:text-5xl my-1`}
  }
  .duration {
    ${tw`text-gray-500 font-bold tracking-widest`}
  }
  .avatar {
    ${tw`h-32 w-32 mt-4 rounded-full flex flex-col mx-auto`}
  }
  .div_button {
    ${tw`mt-3 px-4 py-2 flex flex-col mx-auto text-xl leading-5 font-semibold rounded-full bg-primary-100 text-white`}
  }
`;
const PlanFeatures = styled.div`
  ${tw`flex flex-col -mx-8 px-8 py-8 border-t-2 border-b-2 flex-1`}
  .feature {
    ${tw`mt-5 first:mt-0 font-medium`}
    &:not(.mainFeature) {
      ${tw`text-gray-600`}
    }
  }
  .mainFeature {
    ${tw`text-xl font-bold tracking-wide`}
  }
`;

const DecoratorBlob = styled(SvgDecoratorBlob)`
  ${tw`pointer-events-none -z-20 absolute left-0 bottom-0 h-64 w-64 opacity-25 transform -translate-x-1/2 translate-y-1/2`}
`;

export default ({
  subheading = "TOP 3",
  heading = "Best players overall",
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  id = null,
  plans = null,
}) => {
  const defaultPlans = [
    {
      name: "Placeholder",
      price: "0",

      mainFeature: "Placeholder",
      features: ["Placeholder"],
    },
    {
      name: "Placeholder",
      price: "0",

      mainFeature: "Placeholder",
      features: ["Placeholder"],
    },
    {
      name: "Placeholder",
      price: "0",

      mainFeature: "Placeholder",
      features: ["Placeholder"],
    },
  ];

  if (!plans) plans = defaultPlans;

  const highlightGradientsCss = [
    css`
      background: rgb(196, 202, 206);
      background: linear-gradient(
        115deg,
        rgb(196, 202, 206) 0%,
        rgb(196, 202, 206) 100%
      );
    `,
    css`
      background: rgb(212, 175, 55);
      background: linear-gradient(
        115deg,
        rgb(212, 175, 55) 0%,
        rgb(212, 175, 55) 100%
      );
    `,
    css`
      background: rgb(148, 93, 65);
      background: linear-gradient(
        115deg,
        rgb(148, 93, 65) 0%,
        rgb(148, 93, 65) 100%
      );
    `,
  ];

  return (
    <Container>
      <ContentWithPaddingXl>
        <HeaderContainer>
          {subheading && <Subheading>{subheading}</Subheading>}
          <Heading>{heading}</Heading>
          {description && <Description>{description}</Description>}
        </HeaderContainer>
        <PlansContainer>
          {plans.map((plan, index) => (
            <Plan
              className={"div" + index}
              key={index}
              featured={plan.featured}
              style={index % 2 === 0 ? { marginTop: 100 + "px" } : {}}
            >
              {!plan.featured && (
                <div
                  className="planHighlight"
                  css={
                    highlightGradientsCss[index % highlightGradientsCss.length]
                  }
                />
              )}
              <PlanHeader>
                <span className="name">{plan.name}</span>
                <img className="avatar" src={plan.avatar} alt="avatar" />
                <span className="price">{plan.price}</span>
                <span className="duration">{plan.duration}</span>
                <div className="div_button">
                  <Link to={`/player/${plan.id}`}>Details</Link>
                </div>
              </PlanHeader>
              <PlanFeatures>
                <span className="feature mainFeature">{plan.mainFeature}</span>
                {plan.features.map((feature, index) => (
                  <span key={index} className="feature">
                    {feature}
                  </span>
                ))}
              </PlanFeatures>
            </Plan>
          ))}
          <DecoratorBlob />
        </PlansContainer>
      </ContentWithPaddingXl>
    </Container>
  );
};
