export const imageSource = (user) => {
  if (user.image) return user.image.url;
  return "/images/logo.png";
};
