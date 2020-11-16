/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';

import arrowLeft from '../../../img/icons/arr_left.svg';
import arrowRigth from '../../../img/icons/arr_right.svg';
import IMedia from '../../../types/media';

type Props = {
    media: IMedia[] | undefined;
};

const MediaContent: React.FC<Props> = ({ media }) => {
  /* const videoData = media?.filter((item) =>
    item.mediaType === 'VIDEO');
  const imageData = media?.filter((item) =>
    item.mediaType === 'IMAGE');
  const audioData = media?.filter((item) =>
    item.mediaType === 'AUDIO'); */

  const imageData = [
    {
      mediaType: 'IMAGE',
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS0bFQ5xD1SmvxL_acWoj0A1uFY43nGEzH0Lw&usqp=CAU',
      userId: 65,
    },
    {
      mediaType: 'IMAGE',
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS0bFQ5xD1SmvxL_acWoj0A1uFY43nGEzH0Lw&usqp=CAU',
      userId: 65,
    },
    {
      mediaType: 'IMAGE',
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS0bFQ5xD1SmvxL_acWoj0A1uFY43nGEzH0Lw&usqp=CAU',
      userId: 65,
    },
  ];

  const videoData = [
    {
      mediaType: 'VIDEO',
      url: 'https://youtu.be/vw2FOYjCz38',
      userId: 65,
    },
    {
      mediaType: 'VIDEO',
      url: 'https://youtu.be/n9xhJrPXop4',
      userId: 65,
    },

  ];

  const audioData = [{
    mediaType: 'AUDIO',
    url: 'https://music.yandex.ru/album/49799/track/471935',
    userId: 1,
  }, {
    mediaType: 'AUDIO',
    url: 'https://music.yandex.ru/album/49799/track/471935',
    userId: 1,
  }];

  const settings = {
    loop: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    swipeToSlide: true,
    nextArrow: <ArrowNext />,
    prevArrow: <ArrowPrev />,
  };

  const renderImages = (): JSX.Element | null => {
    if (imageData?.length === 0) return null;
    return (
      <SliderWrapper {...settings}>
        {imageData?.map((image) =>
          <SliderItem key={image.url}><Image src={image.url} alt={image.mediaType} /></SliderItem>
          )}
      </SliderWrapper>
    );
  };

  const renderVideos = (): JSX.Element | null => {
    if (videoData?.length === 0) return null;
    return (
      <SliderWrapper {...settings}>
        {videoData?.map((video) => {
          const baseUrl = (): string | undefined => {
            if (video.url.includes('vimeo')) return 'https://player.vimeo.com/video/';
            return 'https://www.youtube.com/embed/';
          };
          const videoId = video.url.split('/').pop();

          return (
            <SliderItem key={videoId}>
              <Video
                src={`${baseUrl()}${videoId}?controls=0"`}
                title={video.url}
                frameBorder="0"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              />
            </SliderItem>
          );
        })}
      </SliderWrapper>
    );
  };

  const renderAudio = (): JSX.Element | null => {
    if (audioData?.length === 0) return null;
    return (
      <SliderWrapper {...settings}>
        {audioData?.map((audio) =>
          (
            <SliderItem key={audio.url}>
              <iframe title={audio.url} frameBorder="0" width="100%" height="180" src="https://music.yandex.ru/iframe/#track/471935/49799" />
            </SliderItem>
          )
          )}
      </SliderWrapper>
    );
  };

  return (
    <Container>
      {renderImages()}
      {renderVideos()}
      {renderAudio()}
    </Container>

  );
};

const Container = styled.div`
    width: 1000px;
    margin: 0 auto;
    height: auto;
    display: flex;
    flex-direction: column;
    @media (max-width: 1900px) {
        width: 1000px;
      }
    @media (max-width: 1650px) {
        width: 700px;
      }
`;

const SliderWrapper = styled(Slider)`
width: 100%;
height: 480px;
overflow: hidden;
margin-bottom: 20px;
@media (max-width: 1900px) {
  height: 400px;
}
@media (max-width: 1650px) {
  height: 350px;
}
`;

const SliderItem = styled.div`
    width: 100%;    
    padding: 0 55px;    
`;

const ArrowNext = styled.button`
&::before {
    content:'';
}
position: absolute;
top: 50%;
left: 95%;
z-index: 5;
width: 50px;
height: 50px;
background-color: #515151;
background: url(${arrowRigth}) no-repeat;
`;

const ArrowPrev = styled.button`
&::before {
    content:'';
}
position: absolute;
top: 50%;
left: 5%;
z-index: 5;
width: 50px;
height: 50px;
background-color: #515151;
background: url(${arrowLeft}) no-repeat;
`;

const Image = styled.img`
    width: 100%;
    border-radius: 5px;  
    object-fit: contain;  
`;

const Video = styled.iframe`
width: 100%;
height: 480px;
border-radius: 5px;  
    object-fit: contain;
    @media (max-width: 1900px) {
      height: 400px;
    }
    @media (max-width: 1650px) {
      height: 350px;
    }

`;

export default MediaContent;
