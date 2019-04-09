// @flow
import React from 'react';
import type { PostSequence } from 'store/modules/posts';
import { fromNow } from 'lib/common';
import { Link } from 'react-router-dom';

import cx from 'classnames';

import './PostSequences.scss';

type PostSequenceItemProps = {
  sequence: PostSequence,
  username: string,
  active: boolean,
};

type Props = {
  sequences: ?(PostSequence[]),
  username: string,
  currentPostId: string,
};

const PostSequenceItem = ({ sequence, username, active }: PostSequenceItemProps) => {
  const { title, body, meta, url_slug, released_at } = sequence;
  const to = `/@${username}/${url_slug}`;
  return (
    <Link className={cx('PostSequenceItem', { active })} to={to} role='link'>
      <div className="date">{fromNow(released_at)}</div>
      <div className="title">{title}</div>
      <p>{(meta && meta.short_description) || body}</p>
    </Link>
  );
};

const PostSequences = ({ sequences, username, currentPostId }: Props) => {
  if (!sequences || sequences.length === 0 || sequences.length === 1) return null;
  return (
    <div className="PostSequences">
      <div className="wrapper">
        <h3>{username}님이 작성한 다른 포스트</h3>
        {sequences.map(s => (
          <PostSequenceItem
            key={s.id}
            sequence={s}
            username={username}
            active={s.id === currentPostId}
          />
        ))}
      </div>
    </div>
  );
};

export default PostSequences;
