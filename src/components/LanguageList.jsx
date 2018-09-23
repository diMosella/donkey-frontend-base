import React, { PureComponent } from 'react';
import { withLocalize } from 'react-localize-redux';
import PropTypes from 'prop-types';

class LanguageList extends PureComponent {
  render () {
    const { languages, activeLanguage, setActiveLanguage } = this.props;
    return <ul className='languageList'>
      {languages.map(language => (
        <li key={language.code}>
          <button onClick={() => setActiveLanguage(language.code)} disabled={activeLanguage.code === language.code}>
            {language.name}
          </button>
        </li>
      ))}
    </ul>;
  }
};

const languageType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired
});

LanguageList.propTypes = {
  languages: PropTypes.arrayOf(languageType).isRequired,
  activeLanguage: languageType,
  setActiveLanguage: PropTypes.func.isRequired
};

export default withLocalize(LanguageList);
