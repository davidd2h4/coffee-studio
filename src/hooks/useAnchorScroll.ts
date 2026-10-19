import { useEffect } from 'react';

/**
 * Секції нижче першого екрана мають `content-visibility: auto`, тож поки їх не показано,
 * браузер оцінює їхню висоту приблизно — і перехід за якорем (#contact) промахувався.
 * Перед переходом на один кадр рендеримо всі секції: браузер запам’ятовує їхні справжні
 * розміри (`contain-intrinsic-size: auto`), і прокрутка потрапляє точно в ціль.
 */
export function useAnchorScroll() {
  useEffect(() => {
    const root = document.documentElement;

    const measure = () =>
      new Promise<void>((resolve) => {
        root.classList.add('cv-measure');
        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            root.classList.remove('cv-measure');
            resolve();
          }),
        );
      });

    const goTo = async (hash: string, push: boolean) => {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (!target) return;
      await measure();
      target.scrollIntoView({ block: 'start' }); // плавність — з CSS scroll-behavior (крім reduced motion)
      if (push && location.hash !== hash) history.pushState(null, '', hash);
      // Як і звичайне посилання: наступний Tab продовжує з цільової секції.
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    };

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element).closest?.('a[href^="#"]');
      const hash = link?.getAttribute('href');
      if (!hash || hash.length < 2 || !document.getElementById(decodeURIComponent(hash.slice(1)))) return;
      e.preventDefault();
      void goTo(hash, true);
    };

    const onPop = () => location.hash.length > 1 && void goTo(location.hash, false);

    document.addEventListener('click', onClick);
    window.addEventListener('popstate', onPop);
    // Сторінку відкрили одразу з якорем, напр. /#contact.
    if (location.hash.length > 1) void goTo(location.hash, false);

    return () => {
      document.removeEventListener('click', onClick);
      window.removeEventListener('popstate', onPop);
    };
  }, []);
}
