# Minimalist Minimalist Baker

#### [Link to hosted site](https://mmbaker.herokuapp.com)

> I love The Minimalist Baker's recipes but her webiste isn't built for browsing. And oftentimes recipe pages are more blog post than recipe. I use her recipes often so I wanted to be able to choose a recipe and easily see the ingredients/ instructions/ images.

#### Tech

- Mongo/ Mongoose
- Node
- Express
- Cheerio
- Request
- jQuery

This app pulls info from input URLs on minimalistbaker.com using request and cheerio and stores the info in mongo using mongoose as a ODM and allows them to be filtered using tags. 

![Homepage](https://i.imgur.com/OUrmyqC.jpg)

I reconstructed the recipe pages with only the necessary information. The pages have a scrollable image container and an overlayed bar with cooking time, and fridge/ freezer safe time as well as (of course) the ingredients and instructions. 

![Recipe Page](https://i.imgur.com/CLHJYRu.png)

The site is intentionally uncluttered and overtly minimalist to allow the recipes to be easily utilized. The frontend utilizes flex boxes, responsive font sizes, and media queries to be responsive for different device widths.

![Add URL](https://i.imgur.com/jhJTSjr.png)

I left in her Amazon Affiliate URLs in the links in the ingredients, so if for some reason people find and start using this site she'll still make money.


>minimalistbaker uses cloudflare as a CDN which sometimes will sometimes block the site from scraping. If images aren't loading or you are unable to add a new recipe let it sit for 15 minutes then try again.
