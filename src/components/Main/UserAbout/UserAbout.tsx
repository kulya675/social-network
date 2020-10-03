/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-shadow */
import React from 'react';
import desc from './models';

import {
  WallInfoUserAbout,
  InfoHeaderText,
  InfoHeaderTextBlock,
  InfoHeaderListItemLeft,
  InfoHeaderListItemRight,
} from '../../../common/styledComponents';

interface IUserAbout {
    dateOfBirth?: string,
    education?: string,
    profession?: string,
    linkSite?: string,
    city?: string,
    aboutMe?: string,
    languages?: string[]
}

const UserAbout: React.FC<IUserAbout> = function UserAbout({
  dateOfBirth,
  education,
  profession,
  linkSite,
  city,
  aboutMe,
  languages,
}) {
  const descriptionItems = [
    [desc.birthday, dateOfBirth],
    [desc.educ, education],
    [desc.prof, profession],
    [desc.lang, languages?.join(', ')],
    [desc.city, city],
    [desc.about, aboutMe],
    [desc.site, linkSite],
  ];

  const renderAbout = () => descriptionItems.map(([desc, info]) => {
    if (!info) {
      return null;
    }
    return [
      <InfoHeaderListItemLeft key={`desc_${desc}`}>{desc}</InfoHeaderListItemLeft>,
      <InfoHeaderListItemRight key={`info_${desc}`}>{info}</InfoHeaderListItemRight>,
    ];
  });

  return (
    <WallInfoUserAbout>
      <InfoHeaderText>О себе</InfoHeaderText>
      <InfoHeaderTextBlock>
        {renderAbout()}
      </InfoHeaderTextBlock>
    </WallInfoUserAbout>
  );
};

export default UserAbout;