import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Hero from "components/hero/PlayerDetailsHeader";

import Footer from "components/footers/FiveColumnWithBackground.js";

import Stats from "components/features/DashedBorderSixFeatures";

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "components/misc/Spinner";

import KillImage from "images/person-killing-other-with-an-arm.png";
import PlaceImage from "images/trophy.png";
import DeathsImage from "images/grave.png";
import HeadshotImage from "images/headshot.png";
import KniveImage from "images/knives.png";
import HealsImage from "images/patch.png";
import RankImage from "images/quality.png";
import KDAImage from "images/ratio.png";
import PointsImage from "images/satisfaction.png";
import SniperImage from "images/target.png";
import MedalIcon from "images/medal.png";
import ReviveImage from "images/revive.png";

export default () => {
  //const Subheading = tw.span`tracking-wider text-sm font-medium`;
  const HighlightedText = tw.span`bg-primary-500 text-gray-100 px-4 transform -skew-x-12 inline-block`;
  //const HighlightedTextInverse = tw.span`bg-gray-100 text-primary-500 px-4 transform -skew-x-12 inline-block`;
  //const Description = tw.span`inline-block mt-8`;
  const imageCss = tw`rounded-4xl`;
  var temp = {};
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({ player: [] });
  const [avatar, setAvatar] = useState({ avatar: [] });
  const [top100, setTop100] = useState({ avatar: [] });
  const [place, setPlace] = useState("0");
  const [kda, setKda] = useState('0')

  function sortTop(json) {
    return json.data.data.players.sort(
      (a, b) => parseFloat(b.points) - parseFloat(a.points)
    );
  }

  function sortTop100(json) {
    let temp = json.data.data.players.sort(
      (a, b) => parseFloat(b.points) - parseFloat(a.points)
    );

    return temp.map((result) => result.displayName);
  }

  function checkPlace(array, player) {
    if (array.indexOf(player) === -1) {
      return "< Top100";
    } else {
      return array.indexOf(player);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        `http://178.217.216.114:9000/user/${params.playerId}`
      );
      if (result.data.data === undefined) {
        setData("not_exist");
      } else {
        setData(result.data.data.players[0]);
        temp = result.data.data.players[0];
      }
      
    };
    const fetchAvatar = async () => {
      const result = await axios.get(
        `http://178.217.216.114:9000/SteamData/avatars/${params.playerId}`
      );
      setAvatar(result);
      setIsLoading(false);
    };
    const fetchTop100 = async () => {
      const result = await axios.get(`http://178.217.216.114:9000/top100`);

      setTop100(sortTop(result));

      setPlace(checkPlace(sortTop100(result), temp.displayName));

      setKda((temp.kills/temp.deaths).toFixed(4));

      setIsLoading(false);
    };
    fetchData();
    fetchAvatar();
    fetchTop100();
  }, [params]);

  if (isLoading) return <Spinner />;

  if (data === "not_exist") return (<AnimationRevealPage disabled>
    <Hero
      heading={
        <>
          You seem not to exist in game database.
          <br />
          <HighlightedText>{data.displayName}</HighlightedText>
        </>
      }
      // description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      imageSrc={avatar.data.avatarfull}
      imageCss={imageCss}
      imageDecoratorBlob={true}
      primaryButtonText="Back to homepage"
    />


    <Footer />
  </AnimationRevealPage>)

  return (
    <AnimationRevealPage disabled>
      <Hero
        heading={
          <>
            Player details
            <br />
            <HighlightedText>{data.displayName}</HighlightedText>
          </>
        }
        // description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        imageSrc={avatar.data.avatarfull}
        imageCss={imageCss}
        imageDecoratorBlob={true}
        primaryButtonText="Back to homepage"
      />

      <Stats
        cards={[
          {
            imageSrc: PlaceImage,
            title: "Place",
            field_value: place+1,
            description:
              "Lorem ipsum donor amet siti ceali ut enim ad minim veniam, quis nostrud. Sic Semper Tyrannis. Neoas Calie artel.",
          },
          {
            imageSrc: RankImage,
            title: "Level",
            field_value: data.level,
            description:
              "Lorem ipsum donor amet siti ceali ut enim ad minim veniam, quis nostrud. Sic Semper Tyrannis. Neoas Calie artel.",
          },
          {
            imageSrc: PointsImage,
            title: "Points",
            field_value: data.points,
            description:
              "TLorem ipsum donor amet siti ceali ut enim ad minim veniam, quis nostrud. Sic Semper Tyrannis. Neoas Calie artel.",
          },
          {
            imageSrc: MedalIcon,
            title: "Wins",
            field_value: data.wins,
            description:
              "Lorem ipsum donor amet siti ceali ut enim ad minim veniam, quis nostrud. Sic Semper Tyrannis. Neoas Calie artel.",
          },
          {
            imageSrc: KillImage,
            title: "Kills",
            field_value: data.kills,
            description:
              "Lorem ipsum donor amet siti ceali ut enim ad minim veniam, quis nostrud. Sic Semper Tyrannis. Neoas Calie artel.",
          },
          {
            imageSrc: DeathsImage,
            title: "Deaths",
            field_value: data.deaths,
            description:
              "Lorem ipsum donor amet siti ceali ut enim ad minim veniam, quis nostrud. Sic Semper Tyrannis. Neoas Calie artel.",
          },
          {
            imageSrc: KDAImage,
            title: "K/D Ratio",
            field_value: kda,
            description:
              "Lorem ipsum donor amet siti ceali ut enim ad minim veniam, quis nostrud. Sic Semper Tyrannis. Neoas Calie artel.",
          },
          {
            imageSrc: HeadshotImage,
            title: "Headshots",
            field_value: data.heads,
            description:
              "Lorem ipsum donor amet siti ceali ut enim ad minim veniam, quis nostrud. Sic Semper Tyrannis. Neoas Calie artel.",
          },
          {
            imageSrc: KniveImage,
            title: "Knive Kills",
            field_value: data.knifeKills,
            description:
              "Lorem ipsum donor amet siti ceali ut enim ad minim veniam, quis nostrud. Sic Semper Tyrannis. Neoas Calie artel.",
          },
          {
            imageSrc: SniperImage,
            title: "Sniper Kills",
            field_value: data.sniperKills,
            description:
              "Lorem ipsum donor amet siti ceali ut enim ad minim veniam, quis nostrud. Sic Semper Tyrannis. Neoas Calie artel.",
          },
          {
            imageSrc: HealsImage,
            title: "Heals",
            field_value: data.heals,
            description:
              "Lorem ipsum donor amet siti ceali ut enim ad minim veniam, quis nostrud. Sic Semper Tyrannis. Neoas Calie artel.",
          },
          {
            imageSrc: ReviveImage,
            title: "Revivals",
            field_value: data.revivals,
            description:
              "Lorem ipsum donor amet siti ceali ut enim ad minim veniam, quis nostrud. Sic Semper Tyrannis. Neoas Calie artel.",
          },
        ]}
      />
      <Footer />
    </AnimationRevealPage>
    // <>
    //   {!isLoading && (
    //     <>
    //     {console.log(data, "data")}
    //       <h1>Name: {data.displayName} </h1>
    //       <h2>Height: </h2>
    //       <Link to="/">Back to homepage</Link>
    //     </>
    //   )}
    //   {isLoading && (
    //     <>
    //       <p>Fetch Error</p>
    //       <Link to="/">Back to homepage</Link>
    //     </>
    //   )}
    // </>
  );
};
