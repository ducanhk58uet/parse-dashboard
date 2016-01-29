import PropTypes from 'lib/PropTypes';
import React     from 'react';
import styles    from 'components/Fieldset/Fieldset.scss';

let Fieldset = ({ legend, description, children }) => (
  <div className={styles.fieldset}>
    <div className={styles.legend}>{legend}</div>
    <div className={styles.description}>{description}</div>
    <div className={styles.fields}>
      {children}
    </div>
  </div>
);

export default Fieldset;

Fieldset.propTypes = {
  legend: PropTypes.node.describe(
    'The main title of the Fieldset. It can be any renderable content.'
  ),
  description: PropTypes.node.describe(
    'The secondary header of the Fieldset. It can be any renderable content.'
  )
};
