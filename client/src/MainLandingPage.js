import "tailwindcss/tailwind.css";
import React from "react";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Hero from "components/hero/BackgroundAsImage.js";

import Pricing from "components/pricing/ThreePlans.js";

import FAQ from "components/faqs/SingleCol.js";

import Footer from "components/footers/FiveColumnWithBackground.js";

import { Container, ContentWithPaddingXl } from "components/misc/Layouts.js";
import TopTable from "components/leaderboard/TopTable.js";


import Axios from "axios";
import https from "https";

import Spinner from "components/misc/Spinner";

function sortTop100(json) {
  return json.data.data.players.sort(
    (a, b) => parseFloat(b.points) - parseFloat(a.points)
  );
}

function sortBestOfTheRest(json) {
  let temp = json.data.data.players.sort(
    (a, b) => parseFloat(b.points) - parseFloat(a.points)
  );

  return temp.splice(0, 3);
}

class MainLandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      top3: [],
      top100: [],
      avatar_links: [],
      avatar_links_rest: [],
      isFetching: false,
      isFetching_table: false,
      user: [],
      authenticated: false,
      error: null,
    };
  }

  componentDidMount() {
    this.setState({ isFetching: true });

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
        this.setState({
          authenticated: true,
          user: responseJson.user,
        });
      })
      .catch((error) => {
        this.setState({
          authenticated: false,
          error: "Failed to authenticate user",
        });
      });

    Axios.get("http://178.217.216.114:9000/top100", {
      headers: {
        accept: " application/json",
      },
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
      params: {
        //"stats-type": "official"
      },
    }).then((data) => {
      this.setState({
        top100: sortTop100(data),
        top3: sortBestOfTheRest(data),
      });
      return Promise.all(
        this.state.top3.map((u) =>
          Axios.get(`http://178.217.216.114:9000/SteamData/avatars/${u._id}`)
        )
      ).then((data2) => {
        this.setState({
          avatar_links: data2,
          isFetching: false,
        });
        return Promise.all(
          this.state.top100.map((u) =>
            Axios.get(`http://178.217.216.114:9000/SteamData/avatars/${u._id}`)
          )
        ).then((data3) => {
          this.setState({
            avatar_links_rest: data3,
            isFetching_table: true,
          });
        });
      });
    });
  }

  render() {
    const Subheading = tw.span`uppercase tracking-widest font-bold text-primary-500`;
    const HighlightedText = tw.span`text-primary-500`;

    // if your component is while fetching shows a loading to the user
    if (this.state.isFetching) return <Spinner />;
    // if there is no results shows a msg to the user
    if (this.state.top100.length === 0) return <div>there is not items!!!</div>;

    return (
      <AnimationRevealPage disabled>
        <Hero roundedHeaderButton={true} authenticated={this.state.authenticated} user={this.state.user}/>

        <Pricing
          subheading={<Subheading>Top 3</Subheading>}
          heading={
            <>
              Best players <HighlightedText>Overall</HighlightedText>
            </>
          }
          plans={[
            {
              name: "2nd",
              //price: "0",
              //duration: "Placeholder",
              avatar: this.state.avatar_links[1].data.avatarfull,
              price: this.state.top3[1].displayName,
              duration: this.state.top3[1].points.toString(10) + " Points",
              mainFeature: "",
              id: this.state.top3[1]._id,
              features: [
                "Wins: " + this.state.top3[1].wins,
                "Kills: " + this.state.top3[1].kills,
                "Heads: " + this.state.top3[1].heads,
                "Deaths: " + this.state.top3[1].deaths,
                "Level: " + this.state.top3[1].level,
                "Exp: " + this.state.top3[1].exp,
              ],
            },
            {
              name: "1st",
              avatar: this.state.avatar_links[0].data.avatarfull,
              price: this.state.top3[0].displayName,
              duration: this.state.top3[0].points.toString(10) + " Points",
              mainFeature: "",
              id: this.state.top3[0]._id,
              features: [
                "Wins: " + this.state.top3[0].wins,
                "Kills: " + this.state.top3[0].kills,
                "Heads: " + this.state.top3[0].heads,
                "Deaths: " + this.state.top3[0].deaths,
                "Level: " + this.state.top3[0].level,
                "Exp: " + this.state.top3[0].exp,
              ],
            },
            {
              name: "3rd",
              avatar: this.state.avatar_links[2].data.avatarfull,
              price: this.state.top3[2].displayName,
              duration: this.state.top3[2].points.toString(10) + " Points",
              mainFeature: "",
              id: this.state.top3[2]._id,
              features: [
                "Wins: " + this.state.top3[2].wins,
                "Kills: " + this.state.top3[2].kills,
                "Heads: " + this.state.top3[2].heads,
                "Deaths: " + this.state.top3[2].deaths,
                "Level: " + this.state.top3[2].level,
                "Exp: " + this.state.top3[2].exp,
              ],
            },
          ]}
        />
        {!this.state.isFetching_table ? (
          <Container>
            <ContentWithPaddingXl>
              <Spinner />
            </ContentWithPaddingXl>
          </Container>
        ) : (
          <Container>
            <ContentWithPaddingXl>
              {/* TABLE COMPONENT HERE */}
              <TopTable
                people={this.state.top100}
                avatars={this.state.avatar_links_rest}
              />
            </ContentWithPaddingXl>
          </Container>
        )}

        <FAQ
          subheading={<Subheading>FAQS</Subheading>}
          heading={
            <>
              You have <HighlightedText>Questions ?</HighlightedText>
            </>
          }
          faqs={[
            {
              question:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
              answer:
                "Yes, they all are. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            },
            {
              question:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
              answer:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            },
            {
              question:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
              answer:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            },
            {
              question:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
              answer:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            },
            {
              question:
                "ALorem ipsum dolor sit amet, consectetur adipiscing elit",
              answer:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            },
            {
              question: "Do you really support Internet Explorer 11 ?",
              answer: "Nope. Sorry.",
            },
          ]}
        />
        {/* <GetStarted/> */}
        <Footer />
      </AnimationRevealPage>
    );
  }
}

export default MainLandingPage;
