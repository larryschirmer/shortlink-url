import React from 'react';
import { useFormik } from 'formik';

import Button from '@components/Button';
import Input from '@components/Input';
import RadioToggle from '@components/RadioToggle';

import useStateContext from '@context/index';
import { selectLink } from '@context/operations';

import styles from './EditForm.module.scss';

const {
  'edit-form': editFormClass,
  'form-row': formRowClass,
  ctas: ctasClass,
} = styles;

const domainName = process.env.NEXT_PUBLIC_DOMAIN ?? '';

type Inputs = {
  name: string;
  isListed: string;
  slug: string;
  url: string;
};

const EditForm = () => {
  const { dispatch } = useStateContext();

  const handleClose = () => {
    dispatch(selectLink());
  };

  const { handleChange, values } = useFormik<Inputs>({
    initialValues: {
      name: '',
      isListed: 'false',
      slug: '',
      url: '',
    },
    onSubmit: (values) => {
      // dispatch new values
    },
  });

  return (
    <div className={editFormClass}>
      <form onSubmit={handleChange}>
        <div className={`${formRowClass} grid-name`}>
          <Input
            id="name"
            label="Name"
            name="name"
            value={values.name}
            placeholder="Name"
            onChange={handleChange}
          />
        </div>
        <div className={`${formRowClass} grid-listed`}>
          <RadioToggle
            name="isListed"
            currentValue={values.isListed}
            onChange={handleChange}
            buttons={[
              { id: 'listed', value: 'true', label: 'Listed' },
              { id: 'not-listed', value: 'false', label: 'Unlisted' },
            ]}
          />
        </div>
        <div className={`${formRowClass} grid-slug`}>
          <p>{domainName}/</p>
          <Input
            id="slug"
            label="Short Link"
            name="slug"
            value={values.slug}
            placeholder="Slug"
            onChange={handleChange}
          />
        </div>
        <div className={`${formRowClass} grid-url`}>
          <Input
            id="url"
            label="Forwards To"
            name="url"
            value={values.slug}
            placeholder="Url"
            onChange={handleChange}
          />
        </div>
        <div className={`${formRowClass} grid-ctas`}>
          <div className={ctasClass}>
            <Button isSecondary type="button" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditForm;
