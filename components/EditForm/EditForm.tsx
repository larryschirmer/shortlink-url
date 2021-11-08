import React, { useEffect, useRef, FormEvent } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinnerThird } from '@fortawesome/pro-regular-svg-icons';

import Button from '@components/Button';
import Input from '@components/Input';
import RadioToggle from '@components/RadioToggle';

import useStateContext from '@context/index';
import { resetLink, saveLink } from '@context/operations';
import { SaveLink } from '@context/types';

import styles from './EditForm.module.scss';

const { 'edit-form': editFormClass, 'form-row': formRowClass, ctas: ctasClass } = styles;

const domainName = process.env.NEXT_PUBLIC_DOMAIN ?? '';

type Inputs = {
  name: string;
  isListed: string;
  slug: string;
  url: string;
};

const EditForm = () => {
  const {
    dispatch,
    state: {
      data: { list = [] },
      selectedLink,
      loading,
    },
  } = useStateContext();

  const handleCreateLink = (values: SaveLink) => {
    dispatch(saveLink(values));
  };

  const handleClose = () => {
    dispatch(resetLink());
  };

  const initialValues = {
    name: '',
    isListed: 'false',
    slug: '',
    url: '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string(),
    isListed: Yup.string(),
    slug: Yup.string(),
    url: Yup.string().required('URL is required'),
  });

  const { handleChange, values, setValues, submitForm, errors, touched, setFieldTouched, isValid } =
    useFormik<Inputs>({
      initialValues,
      validationSchema,
      onSubmit: (values) => {
        const isListed = values.isListed === 'true';
        if (!selectedLink) handleCreateLink({ ...values, isListed });
      },
      validateOnMount: true,
    });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitForm();
  };

  // set values from selected link
  const prevSelectedLink = useRef('');
  useEffect(() => {
    if (prevSelectedLink.current !== selectedLink) {
      const link = list.find(({ _id }) => _id === selectedLink);
      const { name = '', isListed = false, slug = '', url = '' } = link || {};
      setValues({ name, isListed: isListed.toString(), slug, url });
      prevSelectedLink.current = selectedLink;
    }
  }, [list, selectedLink, setValues]);

  return (
    <div className={editFormClass}>
      <form onSubmit={handleSubmit}>
        <div className={`${formRowClass} grid-name`}>
          <Input
            id="name"
            label="Name"
            name="name"
            value={values.name}
            placeholder="Name"
            error={touched.name ? errors.name : ''}
            onChange={handleChange}
            onBlur={() => setFieldTouched('name', true)}
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
            error={touched.slug ? errors.slug : ''}
            onChange={handleChange}
            onBlur={() => setFieldTouched('slug', true)}
          />
        </div>
        <div className={`${formRowClass} grid-url`}>
          <Input
            id="url"
            label="Forwards To"
            name="url"
            value={values.url}
            placeholder="Url"
            error={touched.url ? errors.url : ''}
            onChange={handleChange}
            onBlur={() => setFieldTouched('url', true)}
          />
        </div>
        <div className={`${formRowClass} grid-ctas`}>
          <div className={ctasClass}>
            <Button isSecondary type="button" onClick={handleClose}>
              Close
            </Button>
            <Button disabled={!isValid || loading} type="submit">
              {loading ? <FontAwesomeIcon spin icon={faSpinnerThird} /> : 'Save'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditForm;
