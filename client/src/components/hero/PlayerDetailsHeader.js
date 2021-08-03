import React, { useState, useEffect } from "react";
import styled from "styled-components";
import tw from "twin.macro";
//eslint-disable-next-line
import { css } from "styled-components/macro";

import Header, {
  NavLink,
  NavLinks,
  PrimaryLink,
  LogoLink,
  NavToggle,
  DesktopNavLinks,
} from "../headers/light.js";

import { ReactComponent as SvgDecoratorBlob1 } from "../../images/svg-decorator-blob-1.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "../../images/dot-pattern.svg";
import DesignIllustration from "../../images/design-illustration.svg";

const Container = tw.div`relative content-center`;
const TwoColumn = tw.div`flex flex-col justify-center content-center lg:flex-row md:items-center max-w-screen-xl mx-auto py-20 md:py-24`;
const LeftColumn = tw.div`relative lg:w-6/12 lg:pr-12 flex-shrink-0 text-center lg:text-left`;
const RightColumn = tw.div`relative mt-12 lg:mt-0 flex flex-col justify-center`;

const Heading = tw.h1`font-black text-3xl md:text-5xl leading-snug max-w-3xl`;
const Paragraph = tw.p`my-5 lg:my-8 text-sm lg:text-base font-medium text-gray-600 max-w-lg mx-auto lg:mx-0`;

const Actions = tw.div`flex flex-col items-center sm:flex-row justify-center lg:justify-start mt-8`;
const PrimaryButton = tw.button`font-bold px-8 lg:px-10 py-3 rounded bg-primary-500 text-gray-100 hocus:bg-primary-700 focus:shadow-outline focus:outline-none transition duration-300`;

const IllustrationContainer = tw.div`flex justify-center md:justify-end items-center relative max-w-3xl lg:max-w-none`;

// Random Decorator Blobs (shapes that you see in background)
const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none opacity-5 absolute left-0 bottom-0 h-64 w-64 transform -translate-x-2/3  -z-10`}
`;
const DecoratorBlob2 = styled(SvgDecoratorBlob2)`
  ${tw`pointer-events-none fill-current text-primary-500 opacity-25 absolute w-32 h-32 right-0 bottom-0 transform translate-x-10 translate-y-10 -z-10`}
`;
const StyledHeader = styled(Header)`
  ${tw`pt-8 max-w-6xl`}
  ${DesktopNavLinks} ${NavLink}, ${LogoLink} {
    ${tw`text-gray-600 hover:border-primary-300 hover:text-primary-200`}
  }
  ${NavToggle}.closed {
    ${tw`text-gray-100 hover:text-primary-500`}
  }
`;

export default ({
  navLinks = null,
  heading = "Placeholder",
  description = "Check player details, stats & performance.",
  primaryButtonText = "Get Started",
  imageSrc = DesignIllustration,
  imageCss = null,
  imageDecoratorBlob = false,
}) => {
  // const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [player, setPlayer] = useState([]);
  const [errorMsg, setError] = useState("");

  //const toggleModal = () => setModalIsOpen(!modalIsOpen);
  useEffect(() => {
    setIsLoading(true);

    fetch("http://dev.wojciechbajer.com:9000", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        throw new Error("failed to authenticate user");
      })
      .then((responseJson) => {
        setAuthenticated(true);
        setPlayer(responseJson.user);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error)
      });
  }, []);

  const defaultNavLinks = [
    <NavLinks key={1}>
      <NavLink href="#">About</NavLink>
      <NavLink href="#">Contact Us</NavLink>
    </NavLinks>,
    <NavLinks key={2}>
      <PrimaryLink href="http://dev.wojciechbajer.com:9000/auth/steam">
        Login with STEAM
      </PrimaryLink>
    </NavLinks>,
  ];

  if (!authenticated) navLinks = defaultNavLinks;

  if (authenticated === true)
    navLinks = [
      <NavLinks key={1}>
        <NavLink href="#">About</NavLink>
        <NavLink href="#">Contact Us</NavLink>
        <NavLink href={`/player/${player.steamId}`}>Your Profile</NavLink>
        <NavLink href="#">Hello, {player.displayName}</NavLink>
      </NavLinks>,
      <NavLinks key={2}>
        <PrimaryLink href="http://dev.wojciechbajer.com:9000/auth/logout">
          Logout
        </PrimaryLink>
      </NavLinks>,
    ];

  return (
    <>
      
      <Container>
      <StyledHeader links={navLinks} />
        <TwoColumn>
          <LeftColumn>
            <Heading>{heading}</Heading>
            <Paragraph>{description}</Paragraph>
            <Actions>
              <PrimaryButton as="a" href="/">
                {primaryButtonText}
              </PrimaryButton>
            </Actions>
          </LeftColumn>
          <RightColumn>
            <IllustrationContainer>
              <img css={imageCss} src={imageSrc} alt="Hero" />
              {imageDecoratorBlob && <DecoratorBlob2 />}
            </IllustrationContainer>
          </RightColumn>
        </TwoColumn>
        <DecoratorBlob1 />
      </Container>
    </>
  );
};
