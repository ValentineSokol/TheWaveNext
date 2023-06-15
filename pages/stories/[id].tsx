import React from 'react';
import { StoryApi } from '@/api/StoryApi';
import { Heading } from '@/components/Heading/Heading';

export default function ReadStoryPage({ story }) {
  return (
    <main>
      <Heading level={1} fontSize={6}>{`${story.name} by ${story.author.username}`}</Heading>
      <ul>{story.chap}</ul>
    </main>
  );
}

export const getServerSideProps = async (context) => {
  const { id } = context.query;
  try {
    const { story } = await StoryApi.getStory(id);

    return { props: { story } };
  } catch (err) {
    if (err.status === 404) {
      return {
        redirect: {
          permanent: false,
          destination: '/404',
        },
        props: {},
      };
    }
  }
};
