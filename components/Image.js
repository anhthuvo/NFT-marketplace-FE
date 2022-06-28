const Image = ({ src, ...props }) => {
  const srcWebp = src.substr(0, src.lastIndexOf('.')) + '.webp';
  return (
    <picture {...props}>
      <source srcSet={srcWebp} type="image/webp" />
      <source srcSet={src} />
      <img src={src} {...props} />
    </picture>
  );
};

export default Image;
