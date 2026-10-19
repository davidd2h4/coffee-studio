import { useEffect, useLayoutEffect, useRef, useState, type ImgHTMLAttributes, type ReactNode } from 'react';
import { useI18n } from '../i18n';

const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  /** Alternative URLs tried in order if the main image fails. */
  fallbacks?: string[];
  /** Custom content shown when every source has failed (defaults to a branded placeholder). */
  fallback?: ReactNode;
}

/**
 * Зображення з плавною появою, запасними джерелами та фірмовою заглушкою.
 * Стан зберігається разом із джерелом, тож кешоване фото, що завантажилося
 * ще до ефектів React, більше не залишається прихованим.
 */
export function SmartImage({ src, alt, fallbacks = [], fallback, className = '', loading = 'lazy', srcSet, sizes, ...rest }: Props) {
  const { t } = useI18n();
  const imgRef = useRef<HTMLImageElement>(null);
  const [state, setState] = useState({ src, attempt: 0, loaded: false });

  // Нове джерело — скидаємо стан під час рендеру, а не в ефекті після нього.
  if (state.src !== src) setState({ src, attempt: 0, loaded: false });

  const sources = [src, ...fallbacks];
  const attempt = state.src === src ? state.attempt : 0;
  const current = sources[attempt];

  const fail = () => setState((s) => ({ ...s, attempt: s.attempt + 1, loaded: false }));
  const succeed = () => setState((s) => (s.loaded ? s : { ...s, loaded: true }));

  // Фото могло завантажитися (або, для eager-фото з готового HTML, впасти) ще до того,
  // як React під’єднав обробники — перевіряємо фактичний стан елемента.
  useIsoLayoutEffect(() => {
    const img = imgRef.current;
    if (!img?.complete) return;
    if (img.naturalWidth > 0) succeed();
    else if (loading === 'eager') fail();
  }, [current]);

  if (!current) {
    if (fallback) return <>{fallback}</>;
    return (
      <div
        className={`img-fallback ${className}`}
        role={alt ? 'img' : undefined}
        aria-label={alt || undefined}
        aria-hidden={alt ? undefined : true}
      >
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <path d="M10 18h24v9a12 12 0 0 1-24 0z" />
          <path d="M34 21h3a5 5 0 0 1 0 10h-4" />
          <path d="M18 7c-2 3 2 5 0 8M25 7c-2 3 2 5 0 8" />
        </svg>
        <span>{alt ? t.image.fallback : 'Coffee Studio'}</span>
      </div>
    );
  }

  return (
    <img
      ref={imgRef}
      key={current}
      src={current}
      // srcset лише для основного джерела, інакше браузер ігнорував би запасне
      srcSet={attempt === 0 ? srcSet : undefined}
      sizes={attempt === 0 ? sizes : undefined}
      alt={alt}
      loading={loading}
      decoding="async"
      // eager-фото (герой) видимі одразу з HTML: не чекаємо JavaScript для появи
      className={`smart-img ${state.loaded || loading === 'eager' ? 'is-loaded' : ''} ${className}`}
      onLoad={succeed}
      onError={fail}
      {...rest}
    />
  );
}
