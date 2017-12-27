// `npm run edit-prod-config` and replace `UglifyJSPlugin` with the code below
// then `npm run prod-build` or `prod-serve` to make a build that only uglifies angular core.
// switch between uglify versions with `npm run use-uglify-3.2.2` or `use-uglify-3.3.2` (remember
// to modify production.js after reinstall)
new webpack.optimize.CommonsChunkPlugin({
  name: 'vendor',
  chunks: ['main'],
  minChunks: (module) => {
    return module.resource && [
      /angular(\/|\\)core/,
    ].some(re => re.test(module.resource))
  }
}),
new UglifyJSPlugin({
  test: [
    /vendor.bundle.js$/
  ],
  sourceMap: buildOptions.sourcemaps,
  uglifyOptions: {
    ecma: wco.supportES2015 ? 6 : 5,
    warnings: buildOptions.verbose,
    ie8: false,
    mangle: {
      safari10: true,
      keep_fnames: true,
    },
    compress: {
      hoist_funs: true,
      keep_fnames: true,
      // this is the option that seems to break stuff
      // inline: false,
    },
    output: {
      beautify: true,
      ascii_only: true,
      comments: false,
      webkit: true,
    },
  }
})
