const sunSVG = `<svg
class="header__theme-logo"
focusable="false"
aria-hidden="true"
viewBox="0 0 24 24"
data-testid="LightModeIcon"
>
<path
  d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"
></path>
</svg>`;
const moonSVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="header__theme-logo"><path fill-rule="evenodd" d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z" clip-rule="evenodd" /> </svg>';

const btnChangeTheme = document.querySelector('.header__theme-btn');

const capilize = word => `${word[0].toUpperCase()}${word.slice(1)}`;

const theme = function () {
  const updateLocalStorageTheme = function (theme) {
    localStorage.setItem('theme', theme);
  };

  const updateThemeButtonContent = function (theme = null) {
    const changeTo = theme ? theme : localStorage.getItem('theme');

    btnChangeTheme.querySelector('svg').remove();

    btnChangeTheme.insertAdjacentHTML(
      'afterbegin',
      changeTo === 'dark' ? sunSVG : moonSVG
    );

    if (!btnChangeTheme.querySelector('p')) return;

    btnChangeTheme.querySelector('p').textContent = `${capilize(
      changeTo === 'dark' ? 'light' : 'dark'
    )} Mode`;
  };

  const getUserTheme = function () {
    const systemSettingDark = window.matchMedia('(prefers-color-scheme: dark)');
    return systemSettingDark.matches ? 'dark' : 'light';
  };

  const setTheme = function () {
    // check if we have theme in localStorage
    const hasLocalStorageTheme = localStorage.getItem('theme');
    const changeTo = hasLocalStorageTheme
      ? hasLocalStorageTheme
      : getUserTheme();

    if (!hasLocalStorageTheme) updateLocalStorageTheme(changeTo);

    document.querySelector('html').dataset.theme = changeTo;
    updateThemeButtonContent(changeTo);
  };
  setTheme();

  btnChangeTheme.addEventListener('click', function () {
    const current = localStorage.getItem('theme');
    const changeToTheme = current === 'dark' ? 'light' : 'dark';

    updateLocalStorageTheme(changeToTheme);

    setTheme();
  });
};
theme();
