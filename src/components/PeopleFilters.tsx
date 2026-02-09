import classNames from 'classnames';
import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const century = searchParams.getAll('centuries');
  const sex = searchParams.get('sex') || '';

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    const params = new URLSearchParams(searchParams);

    params.set('query', event.target.value);
    setSearchParams(params);
  }

  function handleSexChange(value: string) {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set('sex', value);
    } else {
      params.delete('sex');
    }

    setSearchParams(params);
  }

  function handleCenturyChange(cen: string) {
    const params = new URLSearchParams(searchParams);
    const newCen = century.includes(cen)
      ? century.filter(centry => centry !== cen)
      : [...century, cen];

    params.delete('centuries');
    newCen.forEach(cent => params.append('centuries', cent));
    setSearchParams(params);
  }

  function clearCentury() {
    const params = new URLSearchParams(searchParams);

    params.delete('centuries');
    setSearchParams(params);
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          href="#"
          className={classNames({ 'is-active': sex === '' })}
          onClick={e => {
            e.preventDefault();
            handleSexChange('');
          }}
        >
          All
        </a>

        <a
          href="#"
          className={classNames({ 'is-active': sex === 'm' })}
          onClick={e => {
            e.preventDefault();
            handleSexChange('m');
          }}
        >
          Male
        </a>

        <a
          href="#"
          className={classNames({ 'is-active': sex === 'f' })}
          onClick={e => {
            e.preventDefault();
            handleSexChange('f');
          }}
        >
          Female
        </a>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={handleQueryChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {[16, 17, 18, 19, 20].map(value => (
              <Link
                key={value}
                data-cy="century"
                to={`/people?centuries=${value}`}
                className={classNames('button mr-1', {
                  'is-info': century.includes(String(value)),
                })}
                onClick={e => {
                  e.preventDefault();
                  handleCenturyChange(String(value));
                }}
              >
                {value}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <button
              data-cy="centuryALL"
              className="button is-success is-outlined"
              onClick={e => {
                e.preventDefault();
                clearCentury();
              }}
            >
              All
            </button>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link className="button is-link is-outlined is-fullwidth" to="/people">
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
