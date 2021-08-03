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

import "tailwindcss/tailwind.css";
import { Link } from "react-router-dom";

const HeaderContainer = tw.div`mt-1 w-full flex flex-col items-center`;
const Subheading = tw(SubheadingBase)`mb-4`;
const Heading = tw(SectionHeading)`w-full`;
const Description = tw(SectionDescription)`w-full text-center`;

const TopTable = styled.div`
  .div1 {
    ${tw`flex flex-col pt-12`}
  }
  .div2 {
    ${tw`-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8`}
  }
  .div3 {
    ${tw`py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8`}
  }
  .div4 {
    ${tw`shadow overflow-hidden border-b border-gray-200 sm:rounded-lg`}
  }
  .table1 {
    ${tw`min-w-full divide-y divide-gray-200`}
  }
  .thead1 {
    ${tw`bg-gray-100`}
  }
  .th {
    ${tw`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider`}
  }
  .tbody {
    ${tw`bg-white divide-y divide-gray-200`}
  }
  .td {
    ${tw`px-6 py-4 whitespace-nowrap`}
  }
  .div5 {
    ${tw`text-sm text-gray-900`}
  }
  .div6 {
    ${tw`text-sm font-medium text-gray-900`}
  }
  .ml4 {
    ${tw`ml-4`}
  }
  .div_button {
    ${tw`text-sm text-indigo-600 hover:text-indigo-900`}
  }
  .img_outer {
    ${tw`flex-shrink-0 h-10 w-10`}
  }
  .img_inner {
    ${tw`m-0 h-10 w-10 rounded-full`}
  }
  .name_wrapper {
    ${tw`flex items-center`}
  }
`;

export default ({
  subheading = "&",
  heading = "Best of the Rest",
  description = "The Best way out is to SUCCEED",
  avatars = null,
  people = null,
}) => {
  const defaultPeople = [
    {
      deaths: 9071,
      displayName: "Dead Kennedys",
      draws: 8,
      exp: 1407234,
      flagsTaken: 400,
      flagsTaking: 525,
      heads: 465,
      heals: 188,
      kills: 4084,
      knifeKills: 214,
      level: 150,
      plays: 1345,
      points: 737322,
      pspTaken: 1095,
      revivals: 303,
      sniperKills: 563,
      timeInZone: 372374,
      wins: 728,
      _id: "76561198047983777",
    },
  ];
  const defaultAvatars = [{}];

  if (!people) people = defaultPeople;
  if (!avatars) avatars = defaultAvatars;


  return (
    <Container>
      <ContentWithPaddingXl>
        <HeaderContainer>
          {subheading && <Subheading>{subheading}</Subheading>}
          <Heading>{heading}</Heading>
          {description && <Description>{description}</Description>}
        </HeaderContainer>
        {/* NEW  */}
        <TopTable>
          <div className="div1">
            <div className="div2">
              <div className="div3">
                <div className="div4">
                  <table className="table1">
                    <thead className="thead1">
                      <tr>
                        <th scope="col" className="th">
                          Place
                        </th>
                        <th scope="col" className="th">
                          Name
                        </th>
                        <th scope="col" className="th">
                          Points
                        </th>
                        <th scope="col" className="th">
                          Wins
                        </th>
                        <th scope="col" className="th">
                          Kills
                        </th>
                        <th scope="col" className="th">
                          Heads
                        </th>
                        <th scope="col" className="th">
                          Deaths
                        </th>
                        <th scope="col" className="th">
                          Level
                        </th>
                        <th scope="col" className="th">
                          Exp
                        </th>
                      </tr>
                    </thead>
                    <tbody className="tbody">
                      {people.map((people, index) => (
                        <tr key={index}>
                          <td className="td">
                            <div className="ml4">
                              <div className="div6">{4 + index}</div>
                            </div>
                          </td>
                          <td className="td">
                            <div className="name_wrapper">
                              <div className="img_outer">
                                <img
                                  className="img_inner"
                                  src={avatars[index].data.avatarmedium}
                                  alt="avatar"
                                />
                              </div>
                              <div className="ml4">
                                <div className="div6">{people.displayName}</div>
                                <div className="div_button">
                                  <Link to={`/player/${people._id}`}>
                                    Details
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="td">
                            <div className="div5">{people.points}</div>
                          </td>
                          <td className="td">
                            <div className="div5">{people.wins}</div>
                          </td>
                          <td className="td">
                            <div className="div5">{people.kills}</div>
                          </td>
                          <td className="td">
                            <div className="div5">{people.heads}</div>
                          </td>
                          <td className="td">
                            <div className="div5">{people.deaths}</div>
                          </td>
                          <td className="td">
                            <div className="div5">{people.level}</div>
                          </td>
                          <td className="td">
                            <div className="div5">{people.exp}</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </TopTable>
        {/* OLD */}
      </ContentWithPaddingXl>
    </Container>
  );
};
