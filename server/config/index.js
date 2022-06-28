var imagemin = require("imagemin");
var webp = require("imagemin-webp");

const rootFolders = [
  './public/images',
  './public/images/home',
];
rootFolders.forEach((folder)=>{
  imagemin([`${folder}/*.png`], {
    destination: folder,
    plugins: [
      webp({
        lossless: true,
      }),
    ],
  });
  console.log(`PNGs processed ${folder}`);
  imagemin([`${folder}/*.{jpg,jpeg}`], {
    destination: folder,
    plugins: [
      webp({
        quality: 65,
      }),
    ],
  });
  console.log(`JPGs and JPEGs processed ${folder}`);
})

