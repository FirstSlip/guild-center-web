export const generateAvatarColor = (
  username: string
): string => {
  // Преобразуем строку в хэш-код
  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    hash = username.charCodeAt(i) + ((hash << 5) - hash);
  }

  const c = (hash & 0x00ffffff).toString(16).toUpperCase();

  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);

  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  const isTooLight = brightness > 200;
  const isTooDark = brightness < 100;
  const isGray =
    Math.abs(r - g) < 10 &&
    Math.abs(g - b) < 10 &&
    Math.abs(b - r) < 10;
  const isBright = (r + g + b) / 3 > 180;

  if (isTooLight || isTooDark || isGray || isBright) {
    const newR = Math.floor(Math.random() * 200);
    const newG = Math.floor(Math.random() * 200);
    const newB = Math.floor(Math.random() * 200);

    return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
  }
  return `#${c.padStart(6, '0')}`;
};
