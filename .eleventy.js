module.exports = function (eleventyConfig) {
  // The data file is named content.json; "content" is a reserved data
  // property in Eleventy 3, so opt out of the freeze to allow it.
  eleventyConfig.setFreezeReservedData(false);

  // Copy static assets straight through to the build output.
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/admin": "admin" });

  return {
    dir: {
      input: "src",
      output: "_site",
      data: "_data"
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
