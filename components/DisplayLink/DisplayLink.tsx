import React, { useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import QRCode from 'easyqrcodejs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faFileCheck } from '@fortawesome/pro-regular-svg-icons';

import Button from '@components/Button';

import { Url } from '@models/types';

import { useMst } from '@models/index';

import styles from './DisplayLink.module.scss';

const domainName = process.env.NEXT_PUBLIC_DOMAIN ?? '';

const DisplayLink = () => {
  const [didCopy, setDidCopy] = useState(false);
  const [activeLink, setActiveLink] = useState<Url>();

  const qrCodeRef = useRef<HTMLDivElement>(null);

  const {
    app: { resetAppState, selectedLink },
    server: { data: list },
  } = useMst();

  // load the active link on load
  useEffect(() => {
    const link = list.find(({ _id }) => _id === selectedLink);
    setActiveLink(link);
  }, [list, selectedLink]);

  // render the QR code on load
  useEffect(() => {
    const generatedCode = qrCodeRef.current;
    if (activeLink) {
      new QRCode(generatedCode, {
        text: `${domainName}/${activeLink.slug}`,
        width: 50,
        height: 50,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H,
        dotScale: 0.9,
        dotScaleTiming: 0.9,
        dotScaleA: 0.9,
      });
    }
    return () => {
      if (generatedCode) generatedCode.innerHTML = '';
    };
  }, [activeLink]);

  const closeMenu = () => {
    resetAppState();
  };

  const handleCopySlug = async () => {
    try {
      await navigator.clipboard.writeText(`${domainName}/${activeLink?.slug}`);
      setDidCopy(true);
      setTimeout(() => setDidCopy(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles['display-link']}>
      {activeLink && (
        <div className={styles['content']}>
          <div className={styles['row']}>
            <h1>{activeLink.name}</h1>
          </div>
          <div className={styles['row']}>
            <div>
              <button
                onClick={handleCopySlug}
                className={styles['copy-button']}
                type='button'
              >
                {didCopy ? (
                  <FontAwesomeIcon icon={faFileCheck} />
                ) : (
                  <FontAwesomeIcon icon={faCopy} />
                )}
              </button>
              <p>
                <a
                  target='_blank'
                  rel='noopener noreferrer'
                  href={`${domainName}/${activeLink.slug}`}
                >
                  {domainName}/<strong>{activeLink.slug}</strong>
                </a>
              </p>
            </div>
            <div>
              <div ref={qrCodeRef} className={styles['qr-code']} />
            </div>
          </div>
          <div className={styles['row']}>
            <p className={styles['lighten']}>
              <a
                target='_blank'
                rel='noopener noreferrer'
                href={activeLink.url}
              >
                {activeLink.url}
              </a>
            </p>
          </div>
          <div className={styles['row']}>
            <p className={styles['description']}>{activeLink.description}</p>
          </div>
          <div className={styles['row']}>
            <Button isSecondary onClick={closeMenu}>
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default observer(DisplayLink);
