import React, {
  useEffect,
  useRef,
  FormEvent,
  useCallback,
  useState,
} from 'react';
import { observer } from 'mobx-react-lite';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpinnerThird,
  faCopy,
  faFileCheck,
} from '@fortawesome/pro-regular-svg-icons';

import Button from '@components/Button';
import Input from '@components/Input';
import RadioToggle from '@components/RadioToggle';

import { useMst } from '@models/index';
import { SaveLink } from '@context/types';

import styles from './EditForm.module.scss';

const {
  'edit-form': editFormClass,
  'form-row': formRowClass,
  'copy-button': copyBtnClass,
  ctas: ctasClass,
} = styles;

const domainName = process.env.NEXT_PUBLIC_DOMAIN ?? '';

type Inputs = {
  name: string;
  isListed: string;
  slug: string;
  url: string;
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

const EditForm = () => {
  const {
    server: {
      data: list,
      loading,
      saveSuccess,
      resetLinkState,
      createLink,
      updateLink,
    },
    app: { selectedLink, resetAppState },
  } = useMst();

  const [didCopy, setDidCopy] = useState(false);

  const handleCreateLink = (values: SaveLink) => {
    createLink(values);
  };

  const handleUpdateLink = (values: SaveLink) => {
    const prevLink = list.find(link => link._id === selectedLink);
    updateLink(selectedLink, { ...prevLink, ...values });
  };

  const handleClose = useCallback(() => {
    resetLinkState();
    resetAppState();
  }, [resetAppState, resetLinkState]);

  const {
    handleChange,
    values,
    setValues,
    submitForm,
    errors,
    touched,
    setFieldTouched,
    isValid,
  } = useFormik<Inputs>({
    initialValues,
    validationSchema,
    onSubmit: values => {
      const isListed = values.isListed === 'true';
      if (selectedLink) handleUpdateLink({ ...values, isListed });
      else handleCreateLink({ ...values, isListed });
    },
    validateOnMount: true,
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitForm();
  };

  const handleCopySlug = async () => {
    try {
      await navigator.clipboard.writeText(`${domainName}/${values.slug}`);
      setDidCopy(true);
      setTimeout(() => setDidCopy(false), 2000);
    } catch (err) {
      console.error(err);
    }
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

  // exit form on success
  useEffect(() => {
    if (saveSuccess) {
      handleClose();
      setValues(initialValues);
    }
  }, [handleClose, saveSuccess, setValues]);

  return (
    <div className={editFormClass}>
      <form onSubmit={handleSubmit}>
        <div className={`${formRowClass} grid-name`}>
          <Input
            id='name'
            label='Name'
            name='name'
            value={values.name}
            placeholder='Name'
            error={touched.name ? errors.name : ''}
            onChange={handleChange}
            onBlur={() => setFieldTouched('name', true)}
          />
        </div>
        <div className={`${formRowClass} grid-listed`}>
          <RadioToggle
            name='isListed'
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
            id='slug'
            label='Short Link'
            name='slug'
            value={values.slug}
            placeholder='Slug'
            error={touched.slug ? errors.slug : ''}
            onChange={handleChange}
            onBlur={() => setFieldTouched('slug', true)}
          />
          <button
            onClick={handleCopySlug}
            className={copyBtnClass}
            type='button'
          >
            {didCopy ? (
              <FontAwesomeIcon icon={faFileCheck} />
            ) : (
              <FontAwesomeIcon icon={faCopy} />
            )}
          </button>
        </div>
        <div className={`${formRowClass} grid-url`}>
          <Input
            id='url'
            label='Forwards To'
            name='url'
            value={values.url}
            placeholder='Url'
            error={touched.url ? errors.url : ''}
            onChange={handleChange}
            onBlur={() => setFieldTouched('url', true)}
          />
        </div>
        <div className={`${formRowClass} grid-ctas`}>
          <div className={ctasClass}>
            <Button isSecondary type='button' onClick={handleClose}>
              Close
            </Button>
            <Button disabled={!isValid || loading} type='submit'>
              {loading ? (
                <FontAwesomeIcon spin icon={faSpinnerThird} />
              ) : (
                'Save'
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default observer(EditForm);
