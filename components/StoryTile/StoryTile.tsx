import React from 'react';
import { sanitize } from "isomorphic-dompurify";
import Link from "next/link";

export const StoryTile = ({ story }) => {
    return (
        <article>
            <p><Link href={`/stories/${story.id}`}>{story.name}</Link></p>
            <div dangerouslySetInnerHTML={{ __html: sanitize(story.description) }} />
        </article>
    )
}
