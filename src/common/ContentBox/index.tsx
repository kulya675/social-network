import React from 'react';
import { Box, Headline } from './ContentBox.styles';

type Props = {
  headline?: string | null;
  children: React.ReactNode;
};

const ContentBox = ({ headline = null, children }: Props): JSX.Element => (
  <Box>
    {headline && <Headline>{headline}</Headline>}
    {children}
  </Box>
);

export default ContentBox;
