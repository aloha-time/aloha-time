//  we need to base64 it to Data URI
export const MyUrl = (image) => {
  if (image.includes('/images') || image.includes('http')) {
    return image;
  }
  return `data:"image/jpeg"; charset=utf-8;base64,${image.toString('base64')}`;

};
