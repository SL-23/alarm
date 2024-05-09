const colors: {[key: string]: string} = {
  white: '#F1F1F1',
  black: '#1E1E1E',
  yellow: '#FAF7DE',
  blue: '#DEF1FA',
};

export const colorHelper = (color: string) => {
  if (color in colors) return colors[color];
  else return color;
};
