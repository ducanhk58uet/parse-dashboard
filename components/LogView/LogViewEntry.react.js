import PropTypes    from 'lib/PropTypes';
import React        from 'react';
import styles       from 'components/LogView/LogViewEntry.scss';

const TIMESTAMP_REGEX = [
  '([a-z])', // Any Single Word Character (Not Whitespace) 1
  '((?:2|1)\\d{3}(?:-|\\/)(?:(?:0[1-9])|(?:1[0-2]))(?:-|\\/)(?:(?:0[1-9])|(?:[1-2][0-9])|(?:3[0-1]))(?:T|\\s)(?:(?:[0-1][0-9])|(?:2[0-3])):(?:[0-5][0-9]):(?:[0-5][0-9]))', // Time Stamp 1
  '(\\.)',  // Any Single Character 1
  '(\\d)',  // Any Single Digit 1
  '(\\d)',  // Any Single Digit 2
  '(\\d)',  // Any Single Digit 3
  '([a-z])',  // Any Single Word Character (Not Whitespace) 2
  '(\\])'  // Any Single Character 2
].join('');

let isError = (str) => str[0] === 'E';

let getLogEntryInfo = (str) => {
  let re = getTimestampRegex();
  let timeStampStr = str.match(re) ? str.match(re)[0] : '';
  return {
    time: timeStampStr,
    content: str.replace(timeStampStr,''),
    error: isError(str)
  };
}

//example timestamp: 'I2015-09-30T00:36:45.522Z]'
let getTimestampRegex = () => new RegExp(TIMESTAMP_REGEX,['i']);

let LogViewEntry = (props) => {
  let logEntryInfo = getLogEntryInfo(props.text || '');
  let classes = [styles.entry, logEntryInfo.error ? styles.error: ''];
  return (
    <li className={classes.join(' ')}>
      <span className={styles.time}>{logEntryInfo.time} - </span>
      <span className={styles.content}>{logEntryInfo.content}</span>
    </li>
  );
}

export default LogViewEntry;

LogViewEntry.propTypes = {
  text: PropTypes.string.isRequired.describe(
    'The content of the log view entry.'
  ),
};
