import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import React from 'react';

type Props = {
  field: 'name' | 'sex' | 'born' | 'died';
  label: string;
};

export const SortLink: React.FC<Props> = ({ field, label }) => {
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const isActive = sort === field;
  const isDesc = isActive && order === 'desc';

  const getNextSearch = () => {
    if (!isActive) {
      return `?sort=${field}`;
    }

    if (!isDesc) {
      return `?sort=${field}&order=desc`;
    }

    return '';
  };

  const iconClass = () => {
    if (!isActive) {
      return 'fa-sort';
    }

    if (isDesc) {
      return 'fa-sort-down';
    }

    return 'fa-sort-up';
  };

  return (
    <span className="is-flex is-flex-wrap-nowrap">
      {label}

      <Link to={`/people${getNextSearch()}`}>
        <span className="icon">
          <i className={classNames('fas', iconClass())} />
        </span>
      </Link>
    </span>
  );
};
