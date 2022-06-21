export const helpers: {
    [key: string]: {
        name: string,
        category: string,
        brief: string,
        synopsis: string,
        docs?: string,
        isBlock?: boolean,
        isBlockOnly?: boolean
    }
} = {
    each: {
        name: 'each',
        brief: 'iterate over a list',
        category: 'array',
        isBlock: true,
        isBlockOnly: true,
        synopsis: '{{#each array}}',
        docs: `## {{each}}

You can iterate over a list using the built-in each helper. Inside the block, you can use this to reference the element being iterated over.

### Parameters

- \`array\` {Array}: Collection.

### Example

template
~~~
<ul class="people_list">
  {{#each people}}
    <li>{{this}}</li>
  {{/each}}
</ul>
~~~
when used with this context:
input
~~~
{
  people: [
    "Yehuda Katz",
    "Alan Johnson",
    "Charles Jolley",
  ],
}
~~~
will result in:
output
~~~
<ul class="people_list">
    <li>Yehuda Katz</li>
    <li>Alan Johnson</li>
    <li>Charles Jolley</li>
</ul>
~~~
You can use the this expression in any context to reference the current context.

You can optionally provide an else section which will display only when the list is empty.
template
~~~
{{#each paragraphs}}
<p>{{this}}</p>
{{else}}
<p class="empty">No content</p>
{{/each}}
~~~
When looping through items in each, you can optionally reference the current loop index via \`{{@index}}\`.
~~~
{{#each array}} {{@index}}: {{this}} {{/each}}
~~~
Additionally for object iteration, \`{{@key}}\` references the current key name:
~~~
{{#each object}} {{@key}}: {{this}} {{/each}}
~~~
The first and last steps of iteration are noted via the \`@first\` and @last variables when iterating over an array.

Nested each blocks may access the iteration variables via depth based paths. To access the parent index, for example, \`{{@../index}}\` can be used.
`
    },
    limit: {
        name: 'limit',
        category: 'array',
        brief: 'Limits array to second argument.',
        synopsis: '{{limit data limit}}',
        docs: `## {{limit}}

{{limit data limit}}

Limits the number of items returned from an array; returns a new array.
### Parameters

- \`data\` {Array}: Collection.
- \`limit\` {Number}: Index specifying the number of items to exclude.

### Example

Assume that \`{{cart.items}}\` returns 10 items. You can use this helper to limit that behavior to only the first four items.

~~~
<!-- context = {var: 'This is longer than the chosen limit'} -->
{{limit var 10}}
<!-- => This is lo -->
~~~`
    },

    pluck: {
        name: 'pluck',
        category: 'array',
        brief: 'Uses search key to get values from collections.',
        synopsis: '{{pluck ([limit] <collection> [<limit-value>]) \'<path>\'}}',
        docs: `## {{pluck}}

~~~
{{pluck limit collection path}}
~~~

Retrieves corresponding values from some or all elements in a collection using specified search key(s). Returns retrieved values in a comma-separated string. When used in conjunction with the built-in {{each}} helper, returns retrieved values in an array.

### Parameters

- \`limit\`, \`limit-value\`: Optional parameters to limit the number of results returned.
- \`collection\` {Object|Array}: Collection.
- \`path\` {String}: The string to search for.

### Examples

{{pluck ([limit] <collection> [<limit-value>]) '<path>'}}

If each category in categories contains an image object, use dot notation to access the image's children:

json:
~~~json
{
    categories: [
        { "id": 1, "name": "Bakeware", "image": { "data": "http://...", "alt": "Bakeware image"} },
        { "id": 2, "name": "Cookware", "image": { "data": "http://...", "alt": "Cookware image"} },
        { "id": 3, "name": "Cutlery", "image": { "data": "http://...", "alt": "Cutlery image"} }
    ]
}
~~~

handlebars:
~~~handlebars
{{pluck (limit categories 2) 'image.data'}}
<!-- Returns a comma-separated list of image URLs. -->
~~~`
    },
    'cdn': {
        name: 'cdn',
        category: 'assets',
        brief: 'A URL transformer for content delivery networks.',
        synopsis: '{{cdn assetPath}}',
        docs: `## {{cdn}}
~~~
{{cdn assetPath}}
~~~

A URL transformer for content delivery networks.
### Parameters

- assetPath {String}: Path to the file containing static assets.

### Example
~~~
{{cdn "assets/img/image.jpg"}}
<!-- => https://cdn.bcapp/3dsf74g/stencil/123/img/image.jpg -->
~~~
To reference static assets staged locally outside your <theme-name> directory and uploaded using WebDAV, place the webdav: prefix before each corresponding assetPath parameter. For example, the following link:

~~~
<img src="{{cdn 'webdav:img/image.jpg'}}">
~~~

will be transformed to a result like this:
~~~
<img src="https://cdn.bcapp/3dsf74g/content/img/image.jpg">
~~~
In this example, the image.jpg file was uploaded to the WebDAV /content/ directory making /content the WebDAV root directory. Because our presumed local directory is assets/, we can omit that path when referencing its contained files or subdirectories.
CDN custom endpoints

You can define custom CDN endpoints to use with the {{cdn}} helper. This way you can include large, high-resolution image assets in themes without exceeding BigCommerce's 50 MB limit when bundling the theme for upload to BigCommerce.

You could use a local version of the image in development and a version on a CDN such as Imgix in production. To do so, define custom CDN endpoints in your theme's config.json file.

For example:
~~~json
{
    "name": "Cornerstone",
    "version": "1.3.5",
    "settings": {
    "homepage_new_products_count": 12,
    "homepage_featured_products_count": 8,
    "cdn": {
        "customcdn": "https://bigcommerce.customcdn.net"
            }
        }
}
~~~
After defining the endpoint, you can use the short name in the same way as you would use a webdav: protocol:
~~~
<img src="{{cdn 'customcdn:img/image.jpg'}}" />
~~~
In local development, that helper would return:
~~~
<img src="/assets/cdn/customcdn/img/image.jpg"/>
~~~
Whereas in production, it would return:
~~~
<img src="https://bigcommerce.customcdn.net/img/image.jpg" />
~~~
As highlighted above, the helper is configured to rewrite local URLs to an assets/cdn/ subfolder. The stencil bundle command will exclude this local assets/cdn/ subfolder from the bundle that it creates. This filtering circumvents the 50 MB size limit on the resulting ZIP file.`
    },
    money: {
        name: 'money',
        category: 'currency',
        brief: 'Formats number length, thousands delimiter, and decimal delimiter.',
        synopsis: '{{money value n s c}}',
        docs: `## {{money}}
~~~
{{money value n s c}}
~~~

Formats number length, thousands delimiter, and decimal delimiter.

### Parameters

- \`value\` {Number}: The number to format.
- \`n\` {Integer}: Length of decimal.
- \`s\` {Mixed}: Thousands delimiter.
- \`c\` {Mixed}: Decimal delimiter.

### Example
~~~
{{money 1000 2 ',' '.'}}
~~~`
    },
    getFontLoaderConfig: {
        name: 'getFontLoaderConfig',
        category: 'fonts',
        brief: 'Returns font-loader config as a JSON string.',
        synopsis: '{{getFontLoaderConfig fontConfig}}',
        docs: `## {{getFontLoaderConfig}}
~~~
{{getFontLoaderConfig fontConfig}}
~~~

Returns font-loader config as a JSON string.

### Parameters

- \`fontConfig\` {String}: Font config in the Google_FontName_Weight format.

### Example

~~~
{{getFontLoaderConfig 'Google_Karla_700'}}
<!-- => Karla:700 -->
~~~`
    },
    getFontsCollection: {
        name: 'getFontsCollection',
        category: 'fonts',
        brief: 'Returns <link> elements for configured fonts.',
        synopsis: '{{getFontsCollection}}',
        docs: `## {{getFontsCollection}}
~~~
{{getFontsCollection}}
~~~

Returns <link> elements for configured fonts.
### Example

~~~
{{getFontsCollection}}
<!-- => <link href="https://fonts.googleapis.com/css?family=Open+Sans:,400italic,700|Karla:700|Lora:400|Volkron:|Droid:400,700|Crimson+Text:400,700&display=swap" rel="stylesheet"> -->
~~~`
    },
    encodeHtmlEntities: {
        name: 'encodeHtmlEntities',
        category: 'html',
        brief: 'Encodes HTML entities.',
        synopsis: '{{encodeHtmlEntities string args}}',
        docs: `## {{encodeHtmlEntities}}

~~~
{{encodeHtmlEntities string args}}
~~~

Returns a string with HTML entities encoded. You may optionally pass additional encoding arguments.

### Parameters

- \`string\` {String}: String to encode with HTML entities.
- \`args\` {Boolean}: Whitelist of allowed named arguments. Allowed arguments: useNamedReferences, decimal, encodeEverything, allowUnsafeSymbols. Specify arg='true' to use. For example, decimal='true'.

### Examples

~~~
{{encodeHtmlEntities 'foo © bar ≠ baz 𝌆 qux'}}
<!-- => foo &#xA9; bar &#x2260; baz &#x1D306; qux -->

{{encodeHtmlEntities 'an ampersand: &'}}
<!-- => an ampersand: &#x26; -->

{{encodeHtmlEntities "foo © bar ≠ baz 𝌆 qux" useNamedReferences="true"}}
<!-- Returns a string with HTML entities encoded with named references. -->
<!-- => foo &copy; bar &ne; baz &#x1D306; qux -->

{{encodeHtmlEntities "foo © bar ≠ baz 𝌆 qux" decimal="true"}}
<!-- Returns a string with HTML entities encoded with decimal option. -->
<!-- => foo &#169; bar &#8800; baz &#119558; qux -->

{{encodeHtmlEntities "foo © bar ≠ baz 𝌆 qux" encodeEverything="true"}}
<!-- Returns a string with HTML entities encoded with encodeEverything option. -->
<!-- => &#x66;&#x6F;&#x6F;&#x20;&#xA9;&#x20;&#x62;&#x61;&#x72;&#x20;&#x2260;&#x20;&#x62;&#x61;&#x7A;&#x20;&#x1D306;&#x20;&#x71;&#x75;&#x78; -->

{{encodeHtmlEntities "foo © and & ampersand" allowUnsafeSymbols="true"}}
<!-- Returns a string with HTML entities encoded with allowUnsafeSymbols option. -->
<!-- => foo &#xA9; and & ampersand -->
~~~`
    },
    nl2br: {
        name: 'nl2br',
        category: 'html',
        brief: 'Converts newline characters to <br> tags.',
        synopsis: '{{nl2br text}}',
        docs: `## {{nl2br}}
~~~
{{nl2br text}}
~~~

Converts newline characters to <br> tags.

### Parameters

- \`text\` {String}: Text to convert.

### Example

~~~
{{nl2br settings.address}}
<!-- => <br>685 Market St<br>San Francisco<br>94105<br>CA<br> -->
~~~`
    },
    pre: {
        name: 'pre',
        category: 'html',
        brief: 'Renders preformatted text.',
        synopsis: '{{pre value}}',
        docs: `## {{pre}}
~~~
{{pre value}}
~~~

Renders preformatted text. This helper will escape text.

### Parameters

- \`value\` {String}: Text to format.

### Example

~~~
<!-- context = {var: {}} -->
{{pre var}}
<!-- => <pre>{}</pre> -->

<!-- context = {var: "<div>&\"500\"</div>"} -->
{{pre var}}
<!-- => <pre>&quot;&lt;div&gt;&amp;\\&quot;500\\&quot;&lt;/div&gt;&quot;</pre> -->
~~~`
    },
    resourceHints: {
        name: 'resourceHints',
        category: 'html',
        brief: 'Pre-fetches Google fonts.',
        synopsis: '{{resourceHints}}',
        docs: `## {{resourceHints}}

~~~
{{resourceHints}}
~~~

Pre-fetches Google fonts. Outputs a formatted <link> tag for DNS-prefetch.

### Example

~~~
{{resourceHints}}
<!-- => <link rel="dns-prefetch preconnect" href="https://fonts.googleapis.com" crossorigin><link rel="dns-prefetch preconnect" href="https://fonts.gstatic.com" crossorigin> -->
~~~`
    },
    stylesheet: {
        name: 'stylesheet',
        category: 'html',
        brief: 'Renders a <link> tag for inserting a stylesheet.',
        synopsis: '{{stylesheet assetPath}}',
        docs: `## {{stylesheet}}

~~~
{{stylesheet assetPath}}
~~~

Renders a link tag to insert a stylesheet into a theme; returns an HTML string. (This is required if you want Theme Editor to rewrite the stylesheet file when a merchant customizes their theme.)

### Parameters

- \`assetPath\` (String}): Filepath to the theme's CSS stylesheet file.
- \`options\`: You can append optional parameters as key/value pairs.

### Example
~~~
{{stylesheet "assets/css/style.scss" class="myStylesheet"}}
~~~`
    },
    lang: {
        name: 'lang',
        category: 'i18n',
        brief: 'Maps keys to translation files.',
        synopsis: '{{lang translationKey}}',
        docs: `## {{lang}}

~~~
{{lang translationKey}}
~~~

Maps keys to translation files based on the locale indicated by the visitor’s browser.

### Parameters

- \`translationKey\` {String}
- \`options\`: You can append optional parameters as key/value pairs.

### Examples
handlebars

~~~
<label class="form-label" for="search_query_adv">
  {{lang 'forms.search.query' }}
  <small>{{lang 'common.required' }}</small>
</label>
~~~`
    },
    langJson: {
        name: 'langJson',
        category: 'i18n',
        brief: 'Returns language translation keys as a JSON string.',
        synopsis: '{{langJson keyFilter}}',
        docs: `## {{langJson}}

~~~
{{langJson keyFilter}}
~~~

Returns language translation keys as a JSON string.

### Parameters

- \`keyFilter\` {String}: The language translation keys to render for the storefront locale/language.

### Example

~~~
{{langJson 'validation_messages'}}
<!-- This will load validation messages in JSON format for the storefront locale/language. -->
~~~`
    },
    getContentImage: {
        name: 'getContentImage',
        category: 'images',
        brief: 'Returns sized image URL from store`s / content directory.',
        synopsis: '{{getContentImage path width height}}',
        docs: `## {{getContentImage}}
~~~
{{getContentImage path width height}}
~~~

Returns a URL for an image uploaded to /dav/content/. To learn more about uploading files to your store's server, see WebDAV.

### Parameters

- \`path\` {String}: Image path relative to /dav/content/.
- \`width\` {Integer}: Width in pixels.
- \`height\` {Integer}: Height in pixels.

### Example

~~~
<!-- Original image URL returned if no size or invalid size is passed in -->
{{getContentImage "asset.jpg"}}
<!-- => https://cdn.bcapp/3dsf74g/images/stencil/original/content/asset.jpg -->

{{getContentImage "asset.jpg" width="a" height="a"}}
<!-- => https://cdn.bcapp/3dsf74g/images/stencil/original/content/asset.jpg -->

<!-- Sized image URL returned if valid height and/or width passed in -->
{{getContentImage "asset.jpg" width=123 height=321}}
<!-- => https://cdn.bcapp/3dsf74g/images/stencil/123x321/content/asset.jpg -->

{{getContentImage "asset.jpg" width=123}}
<!-- => https://cdn.bcapp/3dsf74g/images/stencil/123w/content/folder/asset.jpg --
~~~`
    },
    getContentImageSrcset: {
        name: 'getContentImageSrcset',
        category: 'images',
        brief: 'Returns source set of URLs for images in /content.',
        synopsis: '{{getContentImageSrcset path}}',
        docs: `## {{getContentImageSrcset}}
~~~
{{getContentImageSrcset path}}
~~~

Returns a srcset for an image uploaded to /dav/content/.

### Parameters

- \`path\` {String}: Image path relative to /dav/content/.

### Example

~~~
{{getContentImageSrcset "asset.jpg"}}
<!-- => https://cdn.bcapp/3dsf74g/images/stencil/80w/content/asset.jpg 80w, https://cdn.bcapp/3dsf74g/images/stencil/160w/content/asset.jpg 160w, https://cdn.bcapp/3dsf74g/images/stencil/320w/content/asset.jpg 320w, https://cdn.bcapp/3dsf74g/images/stencil/640w/content/asset.jpg 640w, https://cdn.bcapp/3dsf74g/images/stencil/960w/content/asset.jpg 960w, https://cdn.bcapp/3dsf74g/images/stencil/1280w/content/asset.jpg 1280w, https://cdn.bcapp/3dsf74g/images/stencil/1920w/content/asset.jpg 1920w, https://cdn.bcapp/3dsf74g/images/stencil/2560w/content/asset.jpg 2560w -->

{{getContentImageSrcset "folder/asset.jpg" width=123}}
<!-- => https://cdn.bcapp/3dsf74g/images/stencil/80w/content/folder/asset.jpg 80w, https://cdn.bcapp/3dsf74g/images/stencil/160w/content/folder/asset.jpg 160w, https://cdn.bcapp/3dsf74g/images/stencil/320w/content/folder/asset.jpg 320w, https://cdn.bcapp/3dsf74g/images/stencil/640w/content/folder/asset.jpg 640w, https://cdn.bcapp/3dsf74g/images/stencil/960w/content/folder/asset.jpg 960w, https://cdn.bcapp/3dsf74g/images/stencil/1280w/content/folder/asset.jpg 1280w, https://cdn.bcapp/3dsf74g/images/stencil/1920w/content/folder/asset.jpg 1920w, https://cdn.bcapp/3dsf74g/images/stencil/2560w/content/folder/asset.jpg 2560w -->
~~~`
    },
    getImage: {
        name: 'getImage',
        category: 'images',
        brief: 'Returns image URL for specified size.',
        synopsis: '{{getImage stencilImage size}}',
        docs: `## {{getImage}}

~~~
{{getImage stencilImage size}}
~~~

Returns <img> tag src value for images of a specified size. Values for the size parameter are defined in the settings array in config.json.

### Parameters

- \`stencilImage\` {String}: A Stencil image.
- \`size\` {String}: A key in the theme_settings object.
- \`defaultImage\` {String}: Optional default image URL to use if the \`stencilImage\` is undefined.

### Example

~~~
{{getImage image "logo"}}
~~~`
    },
    getImageManagerImage: {
        name: 'getImageManagerImage',
        category: 'images',
        brief: 'Returns sized image URL for images in /product_images/uploaded_images.',
        synopsis: '{{getImageManagerImage path width height}}',
        docs: `## {{getImageManagerImage}}

~~~
{{getImageManagerImage path width height}}
~~~

Returns an Image Manager image URL for an image uploaded to /dav/product_images/uploaded_images. To learn more about uploading files to your store's server, see WebDAV.

### Parameters

- \`path\` {String}: Image path relative to /dav/product_images/uploaded_images.
- \`width\` {Integer}: Width in pixels.
- \`height\` {Integer}: Height in pixels.

### Example

~~~
<!-- Original image URL returned if no size or invalid size is passed in -->
{{getImageManagerImage "asset.jpg"}}
<!-- => https://cdn.bcapp/3dsf74g/images/stencil/original/image-manager/asset.jpg -->

<!-- height must be accompanied by width -->
{{getImageManagerImage "folder/asset.jpg" height=123}}
<!-- => https://cdn.bcapp/3dsf74g/images/stencil/original/image-manager/folder/asset.jpg -->

<!-- Sized image URL returned if valid height and/or width passed in -->
{{getImageManagerImage "asset.jpg" width=123}}
<!-- => https://cdn.bcapp/3dsf74g/images/stencil/123w/image-manager/asset.jpg -->

{{getImageManagerImage "folder/asset.jpg" width=123 height=321}}
<!-- => https://cdn.bcapp/3dsf74g/images/stencil/123x321/image-manager/folder/asset.jpg -->
~~~`
    },
    getImageManagerImageSrcset: {
        name: 'getImageManagerImageSrcset',
        category: 'images',
        brief: 'Returns image srcset for images in /product_images/uploaded_images.',
        synopsis: '{{getImageManagerImageSrcset path}}',
        docs: `## {{getImageManagerImageSrcset}}

~~~
{{getImageManagerImageSrcset path}}
~~~

Returns an Image Manager image srcset for an image uploaded to /dav/product_images/uploaded_images.

### Parameters

- \`path\` {String}: Image path relative to /dav/product_images/uploaded_images.

### Example

~~~
{{getImageManagerImageSrcset "asset.jpg"}}
<!-- =>
https://cdn.bcapp/3dsf74g/images/stencil/80w/image-manager/asset.jpg 80w, https://cdn.bcapp/3dsf74g/images/stencil/160w/image-manager/asset.jpg 160w, https://cdn.bcapp/3dsf74g/images/stencil/320w/image-manager/asset.jpg 320w, https://cdn.bcapp/3dsf74g/images/stencil/640w/image-manager/asset.jpg 640w, https://cdn.bcapp/3dsf74g/images/stencil/960w/image-manager/asset.jpg 960w, https://cdn.bcapp/3dsf74g/images/stencil/1280w/image-manager/asset.jpg 1280w, https://cdn.bcapp/3dsf74g/images/stencil/1920w/image-manager/asset.jpg 1920w, https://cdn.bcapp/3dsf74g/images/stencil/2560w/image-manager/asset.jpg 2560w -->

{{getImageManagerImageSrcset "folder/asset.jpg" width=123}}
 <!-- => https://cdn.bcapp/3dsf74g/images/stencil/80w/image-manager/folder/asset.jpg 80w, https://cdn.bcapp/3dsf74g/images/stencil/160w/image-manager/folder/asset.jpg 160w, https://cdn.bcapp/3dsf74g/images/stencil/320w/image-manager/folder/asset.jpg 320w, https://cdn.bcapp/3dsf74g/images/stencil/640w/image-manager/folder/asset.jpg 640w, https://cdn.bcapp/3dsf74g/images/stencil/960w/image-manager/folder/asset.jpg 960w, https://cdn.bcapp/3dsf74g/images/stencil/1280w/image-manager/folder/asset.jpg 1280w, https://cdn.bcapp/3dsf74g/images/stencil/1920w/image-manager/folder/asset.jpg 1920w, https://cdn.bcapp/3dsf74g/images/stencil/2560w/image-manager/folder/asset.jpg 2560w -->
~~~`
    },
    getImageSrcset: {
        name: 'getImageSrcset',
        category: 'images',
        brief: 'Returns single image URL or list of URLs for different sizes.',
        synopsis: '{{getImageSrcset stencilImage size}}',
        docs: `## {{getImageSrcset}}

~~~
{{getImageSrcset stencilImage size}}
~~~

The getImageSrcset helper is a replacement for getImage which allows you to generate either a single image URL (for an <img> src) or a list of image sizes for srcset. Using the srcset attribute, you can specify a list of image sizes for the browser to choose from based on the expected size of the image on the page, the device's pixel density, and other factors.

### Parameters

- \`stencilImage\` {String}: A Stencil image.
- \`size\` {String}: A key in the theme_settings object.
- \`defaultImage\` {String}: Optional default image URL to use if the stencilImage is undefined.

You can specify what sizes you want as named arguments on the helper.

### Example

#### Default sizes

By specifying use_default_sizes=true on the helper, a srcset string will be constructed with a set of sizes chosen by BigCommerce to be optimal for most uses.

~~~
{{getImageSrcset image use_default_sizes=true}}
{{getImageSrcset image "https://place-hold.it/500x300" use_default_sizes=true}}
~~~

#### Default sizes:

~~~
'80w': '80w',
'160w': '160w',
'320w': '320w',
'640w': '640w',
'960w': '960w',
'1280w': '1280w',
'1920w': '1920w',
'2560w': '2560w',
~~~

#### Single 1x size

~~~
{{getImageSrcset image 1x=theme_settings.zoom_size}}
{{getImageSrcset image 1x="1280x800"}}
{{getImageSrcset image 1x="1280w"}}
~~~

By specifying a single size as 1x, you can choose any image resolution. You can reference a value from the theme_settings object (similar to getImage), or you can specify your own size inline. getImageSrcset does not require theme_settings keys to be wrapped in quotes; they should be referenced directly.

#### Pixel density
~~~
{{getImageSrcset image 1x="1280w" 2x="2560w"}}
{{getImageSrcset image 1x="800w" 1.5x="1200w" 2x="1600w"}}
{{getImageSrcset image 1x="640x640" 2x="1280x1280"}}
~~~
By specifying several sizes using the pixel density descriptor, you can generate a srcset of different image resolutions for different pixel density screens as described in Resolution switching: Same size, different resolutions. For example, you can specify a 2x image for Retina screens, and a 1x image for normal screens.

As above, you can reference theme_settings keys or specify your own size inline.

#### Inherent width
~~~
<img src="{{getImage image 'default'}}" srcset="{{getImageSrcset image 100w='100w' 200w='200w' 300w='300w'}}" />

<!-- =>
<img src="https://cdn11.bigcommerce.com/s-abc123/images/stencil/640x640/products/86/286/ablebrewingsystem4_1024x1024__07155.1456436672.jpg?c=2" srcset="https://cdn11.bigcommerce.com/s-abc123/images/stencil/100w/products/86/286/ablebrewingsystem4_1024x1024__07155.1456436672.jpg?c=2 100w, https://cdn11.bigcommerce.com/s-abc123/images/stencil/200w/products/86/286/ablebrewingsystem4_1024x1024__07155.1456436672.jpg?c=2 200w,https://cdn11.bigcommerce.com/s-abc123/images/stencil/300w/products/86/286/ablebrewingsystem4_1024x1024__07155.1456436672.jpg?c=2 300w" /> -->

<img src="{{getImageSrcSet image 1x='1000x1000'}}" srcset="{{getImageSrcset image 1x='1000x1000' 2x='2000x2000'}}" />

<!-- =>
<img src="https://cdn11.bigcommerce.com/s-abc123/images/stencil/640x640/products/86/286/ablebrewingsystem4_1024x1024__07155.1456436672.jpg?c=2" srcset="https://cdn11.bigcommerce.com/s-abc123/images/stencil/100w/products/86/286/ablebrewingsystem4_1024x1024__07155.1456436672.jpg?c=2 100w, https://cdn11.bigcommerce.com/s-abc123/images/stencil/200w/products/86/286/ablebrewingsystem4_1024x1024__07155.1456436672.jpg?c=2 200w,https://cdn11.bigcommerce.com/s-abc123/images/stencil/300w/products/86/286/ablebrewingsystem4_1024x1024__07155.1456436672.jpg?c=2 300w" /> -->
~~~

By specifying several sizes using the inherent width descriptor, you can generate a srcset of different image resolutions based on width, which can in turn be selected by the browser based on the expected size of the image when the page is painted. It is recommended to use this together with a sizes attribute on the <img> element as described in Resolution switching: Different sizes. In Cornerstone, this is handled automatically via JavaScript.

As above, you can reference theme_settings keys or specify your own size inline.`
    },
    'any': {
        name: 'any',
        category: 'logic',
        brief: 'Renders block if any params are true.',
        synopsis: '{{#any arg}}',
        isBlock: true,
        isBlockOnly: true,
        docs: `## {{any}}
~~~
{{any arg}}
~~~
Renders block if one or more parameters are true.
Parameters

- \`arg\` {String|Number|Array|Object}

### Example

~~~ 
{{#any items selected=true}}
  <!-- block to display if any items have selected=true -->
{{/any}}
~~~

A usage example is \`templates/components/category/shop-by-price.html\`, a category page in Stencil's Cornerstone base theme that does not have faceted search turned on. Shoppers will see Shop by price filters instead of product filters.

In this component, the \`{{any}}\` helper is used to determine whether a shopper has selected one of the filters, and whether a "reset" button needs to be displayed:

~~~
{{#any shop_by_price selected=true}}
    <li class="navList-item">
        <a href="{{category_url}}" class="navList-action">
            {{lang 'category.reset'}}
        </a>
    </li>
{{/any}}
~~~`
    },
    'all': {
        name: 'all',
        category: 'logic',
        brief: 'Renders block if all params are true.',
        synopsis: '{{#all arg}}',
        isBlock: true,
        isBlockOnly: true,
        docs: `## {{all}}

~~~
{{all arg}}
~~~

Renders block if all parameters are true.

### Parameters

- \`arg\` {String|Number|Array|Object}

### Example
handlebars

~~~
{{#all items theme_settings.optionA theme_settings.optionB}}
   <!-- block to display if all items evaluate to true -->
{{/all}}
~~~

handlebars

~~~
{{#all product.custom_fields theme_settings.show_custom_fields_tabs}}
    <li class="tab">
        <a class="tab-title" href="#tab-{{dashcase (lowercase (sanitize theme_settings.pdp-custom-fields-tab-label))}}">{{sanitize theme_settings.pdp-custom-fields-tab-label}}</a>
    </li>
{{/all}}
~~~
`
    },
    'compare': {
        name: 'compare',
        category: 'logic',
        isBlock: true,
        isBlockOnly: true,
        brief: 'Compares values with JavaScript operators, including typeof.',
        synopsis: '{{#compare a operator b}}',
        docs: `## {{compare}}

~~~
{{compare a operator b}}
~~~

Compares values with JavaScript operators. Renders block if comparison of the first and third parameters returns true.

### Parameters

- \`a\` {}

- \`operator\` {}: The operator to use. Operators must be enclosed in quotes: ">", "=", "<=", and so on.

    - \`==\`
    - \`===\`
    - \`!=\`
    - \`!===\`
    - \`<\`
    - \`>\`
    - \`<=\`
    - \`>=\`
    - \`typeof\`

- \`b\` {}

- \`options\` {Object}: Options object.

- \`returns\` {String}: Block, or if specified the inverse block is rendered if falsy. `
    },
    'contains': {
        name: 'contains',
        category: 'logic',
        brief: 'Renders block if first param is in second param.',
        isBlock: true,
        isBlockOnly: true,
        synopsis: '{{#contains collection value}}',
        docs: `## {{contains}}

{{contains collection value}}

Renders block if collection has the given value, using strict equality (===) for comparison, otherwise the inverse block is rendered (if specified). If a startIndex is specified and is negative, it is used as the offset from the end of the collection.

### Parameters

- \`collection\` {Array|Object|String}: The collection to iterate over.
- \`value\` {String|Number|Array|Object}: The value to check for.

### Example

~~~
<!-- array = ['a', 'b', 'c'] -->
{{#contains array "d"}}
  This will not be rendered.
{{else}}
  This will be rendered.
{{/contains}}`
    },
    'for': {
        name: 'for',
        category: 'logic',
        brief: 'Iterates for range a to b.',
        synopsis: '{{#for a b}}',
        isBlock: true,
        isBlockOnly: true,
        docs: `## {{for}}

~~~
{{for a b}}
~~~

Repeats block for a specified range from index a to index b. To protect against infinite loops, this helper is limited to 100 iterations.

### Parameters

- \`a\` {Number}: Starting number.
- \`b\` {Number}: Ending number.

### Example

~~~
{{#for 1 12}}
    {{lang (concat 'common.short_months.' $index)}}
{{/for}}
~~~`
    },
    'if': {
        name: 'if',
        category: 'logic',
        brief: 'Renders block if statement is true.',
        isBlock: true,
        isBlockOnly: true,
        synopsis: '{{#if arg}}',
        docs: `## {{if}}

~~~
{{if arg}}
~~~

Renders if block when if-statement evaluates to true; otherwise renders else block.

### Parameters

- \`arg\` {String|Number|Array|Object}

### Example

~~~
{{#if page_type '===' 'account_order'}}
    <li class="navBar-item is-active">
        <a class="navBar-action" href="{{urls.account.orders.all}}">{{lang 'account.nav.orders'}}</a>
    </li>
{{else}}
    <li class="navBar-item is-active">{{lang 'account.nav.orders'}}</li>
{{/if}}
~~~`
    },
    'or': {
        name: 'or',
        category: 'logic',
        brief: 'Renders block if one or more parameters evaluate to true.',
        isBlock: true,
        isBlockOnly: true,
        synopsis: '{{#or arg}}',
        docs: `## {{or}}

~~~
{{or arg}}
~~~

Renders block if one or more parameters evaluates to true.

### Parameters

- \`arg\` {String|Number|Array|Object}: Parameters can be of mixed types.

### Example

handlebars

~~~
{{#or 1 0 0 0 0 0 0}}
    <!-- 1 evaluates to true, so block is rendered-->
{{/or}}
~~~`
    },
    'unless': {
        name: 'unless',
        category: 'logic',
        brief: 'Renders block if a statement evaluates to false.',
        isBlock: true,
        isBlockOnly: true,
        synopsis: '{{#unless arg}}',
        docs: `## {{unless}}

~~~
{{unless arg}}
~~~

Renders a block if a statement is false; does not support operators for comparison expressions.
### Parameters

- \`arg\` {String|Number|Array|Object}

### Example

~~~
{{#each category_results}}
<li class="category-suggestion">
    {{#each this}}
        <a href="{{url}}">{{name}}</a>
        {{#unless @last}} > {{/unless}}
    {{/each}}
</li>
{{/each}} 
~~~`

    },
    concat: {
        name: 'concat',
        category: 'string',
        brief: 'Concatenates two strings.',
        synopsis: '{{concat value otherValue}}',
        docs: `## {{concat}}

~~~
{{concat value otherValue}}
~~~

Concatenates two strings.

### Parameters

- \`value\` {String}
- \`otherValue\` {String}

### Example

~~~
{{concat 'hello' 'world'}}
<!-- => helloworld -->
~~~`
    },
    join: {
        name: 'join',
        category: 'string',
        brief: 'Joins an array of string elements into one string.',
        synopsis: '{{join values separator}}',
        docs: `## {{join}}

~~~
{{join values separator}}
~~~

Joins an array of string elements into a single string.

### Parameters

- \`values\` {Array}
- \`separator\` {String}
- \`limit=<number>\`: An optional limit.

### Example

~~~
<!-- context = {
    list: ['Mario', 'Chris', 'Mick', 'Hau', 'Cody']
} -->
{{join list " "}}
<!-- => 'Mario Chris Mick Hau Cody' -->

{{join list ", "}}
<!-- => 'Mario, Chris, Mick, Hau, Cody' -->
~~~`
    },
    json: {
        name: 'json',
        category: 'string',
        brief: 'Converts a JavaScript object into a JSON string.',
        synopsis: '{{json object}}',
        docs: `{{json}}

~~~
{{json object}}
~~~

Converts a JavaScript object into a JSON string.
### Parameters

- \`object\` {Object}: A JavaScript object.

### Example

~~~
<!-- context = {
    object: { a: 1, b: "hello" }
} -->
{{json object}}
<!-- => '{"a":1,"b":"hello"}' -->
~~~`
    },
    occurrences: {
        name: 'occurrences',
        category: 'string',
        brief: 'Returns the number of occurrences of substring within the given string.',
        synopsis: '{{occurrences str substring}}',
        docs: `## {{occurrences}}

~~~
{{occurrences str substring}}
~~~

Returns the number of occurrences of substring within the given string.

### Parameters

- \`str\` {String}
- \`substring\` {String}

### Example

~~~
{{occurrences "foo bar foo bar baz" "foo"}}
<!-- => 2 -->
~~~`
    },
    'replace': {
        name: 'replace',
        category: 'string',
        brief: 'Replaces all instances of the first parameter in the second parameter.',
        synopsis: '{{#replace firstParam secondParam}}',
        isBlock: true,
        isBlockOnly: true,
        docs: `## {{replace}}

~~~
{{replace firstParam secondParam}}
~~~

Replaces all instances of the first parameter in the second parameter with the child block.

### Parameters

- \`pattern\` {String}
- \`string\` {String}

### Example

~~~
<!-- Replace all instances of \`%%Syndicate%%\` in \`page.content\` with \`{{> components/page/rss_feed}}\`. -->
{{#replace '%%Syndicate%%' page.content}}
    {{> components/page/rss_feed}}
{{else}}
    <p>{{{page.content}}}</p>
{{/replace}}
~~~`
    },
    setURLQueryParam: {
        name: 'setURLQueryParam',
        category: 'string',
        brief: 'Appends keys values to a URL.',
        synopsis: '{{setURLQueryParam url key value}}',
        docs: `## {{setURLQueryParam}}

~~~
{{setURLQueryParam url key value}}
~~~

Appends key values to a URL.

### Parameters

- \`url\` {String}: The URL of the query parameter.
- \`key\` {String}: The query parameter key.
- \`value\` {Number}: The query parameter value of the stated key.

### Example

~~~
{{setURLQueryParam "http://example.com/image.jpg" "c" "2"}}
<!-- results in: http://example.com/image.jpg?c=2 -->
~~~`
    },
    stripQuerystring: {
        name: 'stripQuerystring',
        category: 'string',
        brief: 'Removes a query string.',
        synopsis: '{{stripQuerystring url}}',
        docs: `## {{stripQuerystring}}

~~~
{{stripQuerystring url}}
~~~

Strips query string from a URL.

### Parameters

- \`url\` {String}: The URL containing the query parameter.

### Example

~~~
{{stripQuerystring "http://example.com?tests=true"}}
<!-- results in: http://example.com -->
~~~`
    },
    toLowerCase: {
        name: 'toLowerCase',
        category: 'string',
        brief: 'Converts a string to lowercase.',
        synopsis: '{{toLowerCase string}}',
        docs: `### {{toLowerCase}}

~~~
{{toLowerCase string}}
~~~

Converts a string to lowercase.

### Parameters

- \`string\` {String}: String you want to convert.

### Example

~~~
{{toLowerCase 'I Love PIZZA'}}
<!-- => i love pizza -->
~~~`
    },
    truncate: {
        name: 'truncate',
        category: 'string',
        brief: 'Truncates a string.',
        synopsis: '{{truncate string length}}',
        docs: `## {{truncate}}

~~~
{{truncate string length}}
~~~

Truncates a string.

### Parameters

- \`string\` {String}: The string you want to truncate.
- \`length\` {Number}: The desired length of the returned truncated string.

### Example

~~~
{{truncate "This will be truncated to only the first part of the sentence." 22}}
<!-- results in: 'This will be truncated' -->
~~~`
    },
    'block': {
        name: 'block',
        category: 'template',
        brief: 'Defines a content block.',
        isBlock: true,
        isBlockOnly: true,
        synopsis: '{{#block name}}',
        docs: `## {{block}}

~~~
{{block name}}
~~~

Defines a block of content. You can overwrite it using the partial helper.

### Parameters

- \`name\` {String} - block name

### Example

~~~
<div class="container">
    {{#block "page"}} {{/block}}
</div>
~~~`
    },
    dynamicComponent: {
        name: 'dynamicComponent',
        category: 'template',
        brief: 'Inserts a dynamic partial in the specified path.',
        synopsis: '{{dynamicComponent path}}',
        docs: `## {{dynamicComponent}}

~~~
{{dynamicComponent path}}
~~~

Inserts a dynamic partial in the specified path.

### Parameters

- \`path\` {String}: The path to insert a dynamic component in.

### Example

~~~
{{#each forms.create_account.address_fields }}
    {{{dynamicComponent 'components/common/forms'}}}
{{/each}}
~~~`
    },
    inject: {
        name: 'inject',
        category: 'template',
        brief: 'Injects key values into {{jsContext}}.',
        synopsis: '{{inject value object}}',
        docs: `## {{inject}}

~~~
{{inject value object}}
~~~

Injects key values into the jsContext helper.

### Parameters

- \`value\` {String}: The value to inject.
- \`object\` {Object}

### Example

handlebars

~~~
{{inject "myProductName" product.title}}

<script>
var jsContext = JSON.parse({{jsContext}});
console.log(jsContext.myProductName);
// results in: "BigCommerce Coffee Mug"
</script>
~~~

handlebars

~~~
{{inject 'productSize' theme_settings.product_size}}
<!-- Returns a JSON representation of an object of all the keys injected. -->
~~~`
    },
    jsContext: {
        name: 'jsContext',
        category: 'template',
        brief: 'Returns JSON for all data injected by {{inject}}.',
        synopsis: '{{jsContext}}',
        docs: `## {{jsContext}}

~~~
{{jsContext}}
~~~

Returns a JSON representation of the data injected by the inject helper.`
    },
    'partial': {
        name: 'partial',
        category: 'template',
        brief: 'Overrides content defined by {{block}}.',
        isBlock: true,
        isBlockOnly: true,
        synopsis: '{{partial string}}',
        docs: `## {{partial}}

~~~
{{partial string}}
~~~

Overrides content defined by the block helper.

### Parameters

- \`string\` {String}

### Example

~~~
{{#partial "head"}}
    {{#if pagination.category.previous}}
        <link rel="prev" href="{{pagination.category.previous}}">
    {{/if}}
    {{#if pagination.category.next}}
        <link rel="next" href="{{pagination.category.next}}">
    {{/if}}
{{/partial}}
~~~`
    },
    region: {
        name: 'region',
        category: 'template',
        brief: 'Specifies a widget region.',
        synopsis: '{{region name}}',
        docs: `## {{region}}

~~~
{{region name}}
~~~

Specifies a widget region.

### Parameters

- \`name\` {String}: The name of the region.

### Example

~~~
<!-- context = {
    banner-top: "hello world"
    } -->
{{region name="banner-top"}}
<!-- => <div data-content-region="banner-top">hello world</div> -->
~~~`
    },
    assignVar: {
        name: 'assignVar',
        category: 'variables',
        brief: 'Saves value to a variable.',
        synopsis: '{{assignVar key value}}',
        docs: `## {{assignVar}}

~~~
{{assignVar key value}}
~~~

Assigns a variable for later use in the template.
### Parameters

- \`key\` {String}
- \`value\` {String|Number}

### Example

~~~
{{assignVar "foo" 10}}
~~~`
    },
    getVar: {
        name: 'getVar',
        category: 'variables',
        brief: 'Returns a variable value.',
        synopsis: `{{getVar key}}`,
        docs: `## {{getVar}}

~~~
{{getVar key}}
~~~

Returns the variable set by assignVar.

### Parameters

- \`key\` {String}

### Example

~~~
{{getVar "foo"}}
~~~`
    },
    decrementVar: {
        name: 'decrementVar',
        category: 'variables',
        brief: 'Decrements a variable by 1.',
        synopsis: '{{decrementVar key}}',
        docs: `## {{decrementVar}}

~~~
{{decrementVar key}}
~~~

Decrements the variable set by assignVar by 1.

### Parameters

- \`key\` {String}

### Example

~~~
{{decrementVar "foo"}}
~~~`
    },
    incrementVar: {
        name: 'incrementVar',
        category: 'variables',
        brief: 'Increments a variable by 1.',
        synopsis: '{{incrementVar key}}',
        docs: `## {{incrementVar}}

~~~
{{incrementVar key}}
~~~

Increments the variable set by assignVar by 1.

### Parameters

- \`key\` {String}

### Example

~~~
{{incrementVar "foo"}}
~~~`
    },
    after: {
        name: 'after',
        category: 'array',
        brief: 'Returns all of the items in an array after the specified index.',
        synopsis: '{{after array pos}}',
        docs: `## {{after}}

Returns all of the items in an array after the specified index. Opposite of before.

### Params

- \`array\` {Array}: Collection
- \`n\` {Number}: Starting index (number of items to exclude)
- \`returns\` {Array}: Array exluding n items.

### Example

~~~
<!-- array: ['a', 'b', 'c'] -->
{{after array 1}}
<!-- results in: '["c"]' -->
~~~`
    },
    arrayify: {
        name: 'arrayify',
        category: 'array',
        brief: 'Casts the given value to an array.',
        synopsis: '{{arrayify value}}',
        docs: `## {{arrayify}}

Cast the given value to an array.

### Params

- \`value\` {any}
- \`returns\` {Array}

### Example

~~~
{{arrayify "foo"}}
<!-- results in: [ "foo" ] -->        
~~~`
    },
    before: {
        name: 'before',
        category: 'array',
        brief: 'Returns all of the items in the collection before the specified count.',
        synopsis: '{{before array pos}}',
        docs: `## {{before}}

Return all of the items in the collection before the specified count. Opposite of after.

### Params

- \`array\` {Array}
- \`n\` {Number}
- \`returns\` {Array}: Array excluding items after the given number.

### Example

~~~
<!-- array: ['a', 'b', 'c'] -->
{{before array 2}}
<!-- results in: '["a", "b"]' -->        
~~~`
    },
    'eachIndex': {
        name: 'eachIndex',
        category: 'array',
        brief: 'Loop through array with index',
        isBlock: true,
        isBlockOnly: true,
        synopsis: '{{#eachIndex array}}',
        docs: `## {{eachIndex}}

### Params

- \`array\` {Array}
- \`options\` {Object}
- \`returns\` {String}

### Example

~~~
<!-- array: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'] -->
{{#eachIndex array}}
  {{item}} is {{index}}
{{/eachIndex}}
~~~`
    },
    'filter': {
        name: 'filter',
        category: 'array',
        brief: 'Block helper that filters the given array and renders the block for values that evaluate to true, otherwise the inverse block is returned.',
        isBlock: true,
        isBlockOnly: true,
        synopsis: '{{filter array value}}',
        docs: `## {{filter}}

Block helper that filters the given array and renders the block for values that evaluate to true, otherwise the inverse block is returned.

### Params

- \`array\` {Array}
- \`value\` {any}
- \`options\` {Object}
- \`returns\` {String}

### Example
~~~
<!-- array: ['a', 'b', 'c'] -->
{{#filter array "foo"}}AAA{{else}}BBB{{/filter}}
<!-- results in: 'BBB' -->
~~~`
    },
    first: {
        name: 'first',
        category: 'array',
        brief: 'Returns the first item or first n items of an array.',
        synopsis: '{{first array count}}',
        docs: `## {{first}}

Returns the first item, or first n items of an array.

### Params

- \`array\` {Array}
- \`n\` {Number}: Number of items to return, starting at 0.
- \`returns\` {Array}

### Example
~~~
{{first "['a', 'b', 'c', 'd', 'e']" 2}}
<!-- results in: '["a", "b"]' -->
~~~`
    },
    'forEach': {
        name: 'forEach',
        category: 'array',
        brief: 'Iterates over each item in an array and exposes the current item in the array as context to the inner block.',
        isBlock: true,
        isBlockOnly: true,
        synopsis: '{{forEach array}}',
        docs: `{{forEach}}

Iterates over each item in an array and exposes the current item in the array as context to the inner block. In addition to the current array item, the helper exposes the following variables to the inner block:

- \`index\`
- \`total\`
- \`isFirst\`
- \`isLast\` Also, @index is exposed as a private variable, and additional private variables may be defined as hash arguments.

### Params

- \`array\` {Array}
- \`returns\` {String}

### Example

~~~
<!-- accounts = [
{'name': 'John', 'email': 'john@example.com'},
{'name': 'Malcolm', 'email': 'malcolm@example.com'},
{'name': 'David', 'email': 'david@example.com'}
] -->

{{#forEach accounts}}
  <a href="mailto:{{ email }}" title="Send an email to {{ name }}">
    {{ name }}
  </a>{{#unless isLast}}, {{/unless}}
{{/forEach}}
~~~`
    },
    'inArray': {
        name: 'inArray',
        category: 'array',
        brief: 'Block helper that renders the block if an array has the given value.',
        isBlock: true,
        isBlockOnly: true,
        synopsis: '{{inArray array value}}',
        docs: `## {{inArray}}

Block helper that renders the block if an array has the given value. Optionally specify an inverse block to render when the array does not have the given value.

### Params

- \`array\` {Array}
- \`value\` {any}
- \`options\` {Object}
- \`returns\` {String}

### Example
~~~
<!-- array: ['a', 'b', 'c'] -->
{{#inArray array "d"}}
  foo
{{else}}
  bar
{{/inArray}}
<!-- results in: 'bar' -->
~~~`
    },
    isArray: {
        name: 'isArray',
        category: 'array',
        brief: 'Returns true if value is an es5 array.',
        synopsis: '{{isArray value}}',
        docs: `## {{isArray}}

Returns true if value is an es5 array.

### Params

- \`value\` {any}: The value to test.
- \`returns\` {Boolean}

### Example

~~~
{{isArray "abc"}}
<!-- results in: false -->

<!-- array: [1, 2, 3] -->
{{isArray array}}
<!-- results in: true -->
~~~`
    },
    last: {
        name: 'last',
        category: 'array',
        brief: 'Returns the last item, or last n items of an array or string.',
        synopsis: '{{last value count}}',
        docs: `## {{last}}

Returns the last item, or last n items of an array or string. Opposite of first.

### Params

- \`value\` {Array|String}: Array or string.
- \`n\` {Number}: Number of items to return from the end of the array.
- \`returns\` {Array}

### Example
~~~
<!-- var value = ['a', 'b', 'c', 'd', 'e'] -->

{{last value}}
<!-- results in: ['e'] -->

{{last value 2}}
<!-- results in: ['d', 'e'] -->

{{last value 3}}
<!-- results in: ['c', 'd', 'e'] -->
~~~`
    },
    length: {
        name: 'length',
        category: 'array',
        brief: 'Returns the length of the given string or array.',
        synopsis: '{{length obj}}',
        docs: `## {{length}}

Returns the length of the given string or array.

### Params

- \`value\` {Array|Object|String}
- \`returns\` {Number}: The length of the value.

### Example
~~~
{{length '["a", "b", "c"]'}}
<!-- results in: 3 -->

<!-- results in: myArray = ['a', 'b', 'c', 'd', 'e']; -->
{{length myArray}}
<!-- results in: 5 -->

<!-- results in: myObject = {'a': 'a', 'b': 'b'}; -->
{{length myObject}}
<!-- results in: 2 -->
~~~`
    },
    lengthEqual: {
        name: 'lengthEqual',
        category: 'array',
        brief: 'Returns true if the length of the given value is equal to the given length.',
        synopsis: '{{lengthEqual array length}}'
    },
    map: {
        name: 'map',
        category: 'array',
        brief: 'Returns a new array created by calling function on each element of the given array.',
        synopsis: '{{map array function}}',
        docs: `## {{map}}

Returns a new array, created by calling function on each element of the given array. For example,

### Params

- \`array\` {Array}
- \`fn\` {Function}
- \`returns\` {String}

### Example
~~~
<!-- array: ['a', 'b', 'c'], and "double" is a
fictitious function that duplicates letters -->
{{map array double}}
<!-- results in: '["aa", "bb", "cc"]' -->
~~~`
    },
    'some': {
        name: 'some',
        category: 'array',
        brief: 'Block helper that returns the block if the callback returns true for some value in the given array.',
        synopsis: '{{#some array callback}}',
        isBlock: true,
        isBlockOnly: true,
        docs: `## {{some}}

Block helper that returns the block if the callback returns true for some value in the given array.

### Params

- \`array\` {Array}
- \`iter\` {Function}: Iteratee
- {Options}: Handlebars provided options object
- \`returns\` {String}

### Example
~~~
<!-- array: [1, 'b', 3] -->
{{#some array isString}}
  Render me if the array has a string.
{{else}}
  Render me if it doesn't.
{{/some}}
<!-- results in: 'Render me if the array has a string.' -->
~~~`
    },
    sort: {
        name: 'sort',
        category: 'array',
        brief: 'Sorts the given array. If an array of objects is passed, you may optionally pass a key to sort on as the second argument.',
        synopsis: '{{sort array}}',
        docs: `## {{sort}}

Sort the given array. If an array of objects is passed, you may optionally pass a key to sort on as the second argument. You may alternatively pass a sorting function as the second argument.

### Params

- \`array\` {Array}: the array to sort.
- \`key\` {String|Function}: The object key to sort by, or sorting function.

### Example
~~~
<!-- array: ['b', 'a', 'c'] -->
{{sort array}}
<!-- results in: '["a", "b", "c"]' -->
~~~`
    },
    sortBy: {
        name: 'sortBy',
        category: 'array',
        brief: 'Sorts an array. If an array of objects is passed, you may optionally pass a key to sort on as the second argument.',
        synopsis: '{{sortBy array props}}',
        docs: `## {{sortBy}}

Sort an array. If an array of objects is passed, you may optionally pass a key to sort on as the second argument. You may alternatively pass a sorting function as the second argument.

### Params

- \`array\` {Array}: the array to sort.
- \`props\` {String|Function}: One or more properties to sort by, or sorting functions to use.

### Example
~~~
<!-- array: [{a: 'zzz'}, {a: 'aaa'}] -->
{{sortBy array "a"}}
<!-- results in: '[{"a":"aaa"}, {"a":"zzz"}]' -->
~~~`
    },
    'withAfter': {
        name: 'withAfter',
        category: 'array',
        brief: 'Uses the items in the array after the specified index as context inside a block.',
        isBlock: true,
        isBlockOnly: true,
        synopsis: '{{#withAfter array index}}',
        docs: `## {{withAfter}}

Use the items in the array after the specified index as context inside a block. Opposite of withBefore.

### Params

- \`array\` {Array}
- \`idx\` {Number}
- \`options\` {Object}
- \`returns\` {Array}

### Example
~~~
<!-- array: ['a', 'b', 'c', 'd', 'e'] -->
{{#withAfter array 3}}
  {{this}}
{{/withAfter}}
<!-- results in: "de" -->
~~~`
    },
    'withBefore': {
        name: 'withBefore',
        category: 'array',
        brief: 'Uses the items in the array before the specified index as context inside a block.',
        isBlock: true,
        isBlockOnly: true,
        synopsis: '{{#withBefore array index}}',
        docs: `## {{withBefore}}

Use the items in the array before the specified index as context inside a block. Opposite of withAfter.

### Params

- \`array\` {Array}
- \`idx\` {Number}
- \`options\` {Object}
- \`returns\` {Array}

### Example
~~~
<!-- array: ['a', 'b', 'c', 'd', 'e'] -->
{{#withBefore array 3}}
  {{this}}
{{/withBefore}}
<!-- results in: 'ab' -->
~~~`
    },
    'withFirst': {
        name: 'withFirst',
        category: 'array',
        brief: 'Uses the first item in a collection inside a handlebars block expression.',
        isBlock: true,
        isBlockOnly: true,
        synopsis: '{{#withFirst array}}',
        docs: `## {{withFirst}}

Use the first item in a collection inside a handlebars block expression. Opposite of withLast.

### Params

- \`array\` {Array}
- \`idx\` {Number}
- \`options\` {Object}
- \`returns\` {String}

### Example
~~~
<!-- array: ['a', 'b', 'c'] -->
{{#withFirst array}}
  {{this}}
{{/withFirst}}
<!-- results in: 'a' -->
~~~`
    },
    'withLast': {
        name: 'withLast',
        category: 'array',
        brief: 'Uses the last item or n items in an array as context inside a block.',
        isBlock: true,
        isBlockOnly: true,
        synopsis: '{{#withLast array}}',
        docs: `## {{withLast}}

Use the last item or n items in an array as context inside a block. Opposite of withFirst.

### Params

- \`array\` {Array}
- \`idx\` {Number}: The starting index.
- \`options\` {Object}
- \`returns\` {String}

### Example

~~~
<!-- array: ['a', 'b', 'c'] -->
{{#withLast array}}
  {{this}}
{{/withLast}}
<!-- results in: 'c' -->
~~~`
    },
    'withSort': {
        name: 'withSort',
        category: 'array',
        brief: 'Block helper that sorts a collection and exposes the sorted collection as context inside the block.',
        isBlock: true,
        isBlockOnly: true,
        synopsis: '{{withSort array}}',
        docs: `## {{withSort}}

Block helper that sorts a collection and exposes the sorted collection as context inside the block.

### Params

- \`array\` {Array}
- \`prop\` {String}
- \`options\` {Object}: Specify reverse="true" to reverse the array.
- \`returns\` {String}

### Example
~~~
<!-- array: ['b', 'a', 'c'] -->
{{#withSort array}}{{this}}{{/withSort}}
<!-- results in: 'abc' -->
~~~`

    },
    'isEmpty': {
        name: 'isEmpty',
        category: 'collection',
        brief: 'Inline, subexpression, or block helper that returns true (or the block) if the given collection is empty, or false (or the inverse block, if supplied) if the collection is not empty.',
        isBlock: true,
        synopsis: '{{[#]isEmpty array}}',
        docs: `## {{isEmpty}}

Inline, subexpression, or block helper that returns true (or the block) if the given collection is empty, or false (or the inverse block, if supplied) if the colleciton is not empty.

### Params

- \`collection\` {Object}
- \`options\` {Object}
- \`returns\` {String}

### Example
~~~
<!-- array: [] -->
{{#isEmpty array}}AAA{{else}}BBB{{/isEmpty}}
<!-- results in: 'AAA' -->

<!-- array: [] -->
{{isEmpty array}}
<!-- results in: true -->
~~~`
    },
    'iterate': {
        name: 'iterate',
        category: 'collection',
        brief: 'Block helper that iterates over an array or object. If an array is given, \`.forEach\` is called, or if an object is given, \`.forOwn\` is called, otherwise the inverse block is returned.',
        isBlock: true,
        isBlockOnly: true,
        synopsis: '{{#iterate obj|array}}',
        docs: `## {{iterate}}

Block helper that iterates over an array or object. If an array is given, .forEach is called, or if an object is given, .forOwn is called, otherwise the inverse block is returned.

### Params

- \`collection\` {Object|Array}: The collection to iterate over
- \`options\` {Object}
- \`returns\` {String}
`
    },
    'and': {
        name: 'and',
        category: 'comparison',
        brief: 'Helper that renders the block if both of the given values are truthy. If an inverse block is specified it will be rendered when falsy.',
        isBlock: true,
        isBlockOnly: true,
        synopsis: '{{#and great magnificent}}',
        docs: `## {{and}}

Helper that renders the block if both of the given values are truthy. If an inverse block is specified it will be rendered when falsy. Works as a block helper, inline helper or subexpression.

### Params

- \`a\` {any}
- \`b\` {any}
- \`options\` {Object}: Handlebars provided options object
- \`returns\` {String}

### Example
~~~
<!-- {great: true, magnificent: true} -->
{{#and great magnificent}}A{{else}}B{{/and}}
<!-- results in: 'A' -->
~~~`
    },
    default: {
        name: 'default',
        category: 'comparison',
        brief: 'Returns the first value that is not undefined, otherwise the default value is returned.',
        synopsis: "{{default value defaultValue}}",
        docs: `## {{default}}

Returns the first value that is not undefined, otherwise the "default" value is returned.

### Params

- \`value\` {any}
- \`defaultValue\` {any}
- \`returns\` {String}
`
    },
    'eq': {
        name: 'eq',
        category: 'comparison',
        brief: 'Block helper that renders a block if a is equal to b. If an inverse block is specified it will be rendered when falsy.',
        isBlock: true,
        isBlockOnly: true,
        synopsis: '{{#eq a b}}',
        docs: `## {{eq}}

Block helper that renders a block if a is equal to b. If an inverse block is specified it will be rendered when falsy. You may optionally use the compare="" hash argument for the second value.

### Params

- \`a\` {String}
- \`b\` {String}
- \`options\` {Object}: Handlebars provided options object
- \`returns\` {String}: Block, or inverse block if specified and falsey.
`
    },
    'gt': {
        name: 'gt',
        category: 'comparison',
        brief: 'Block helper that renders a block if a is greater than b. If an inverse block is specified, it will be rendered when falsy.',
        isBlock: true,
        isBlockOnly: true,
        synopsis: '{{#gt a b}}',
        docs: `## {{gt}}

Block helper that renders a block if a is greater than b.

If an inverse block is specified it will be rendered when falsy. You may optionally use the compare="" hash argument for the second value.

### Params

- \`a\` {String}
- \`b\` {String}
- \`options\` {Object}: Handlebars provided options object
- \`returns\` {String}: Block, or inverse block if specified and falsey.`
    },
    'gte': {
        name: 'gte',
        category: 'comparison',
        brief: 'Block helper that renders a block if a is greater than or equal to b. If an inverse block is specified it will be rendered when falsy.',
        isBlock: true,
        isBlockOnly: true,
        synopsis: '{{#gte a b}}',
        docs: `### {{gte}}

Block helper that renders a block if a is greater than or equal to b.

If an inverse block is specified it will be rendered when falsy. You may optionally use the compare="" hash argument for the second value.

### Params

- \`a\` {String}
- \`b\` {String}
- \`options\` {Object}: Handlebars provided options object
- \`returns\` {String}: Block, or inverse block if specified and falsey.`
    },
    'has': {
        name: 'has',
        category: 'comparison',
        brief: 'Block helper that renders a block if value has pattern. If an inverse block is specified it will be rendered when falsy.',
        isBlock: true,
        isBlockOnly: true,
        synopsis: '{{has value pattern}}',
        docs: `## {{has}}

Block helper that renders a block if value has pattern. If an inverse block is specified it will be rendered when falsy.

### Params

- \`val\` {any}: The value to check.
- \`pattern\` {any}: The pattern to check for.
- \`options\` {Object}: Handlebars provided options object
- \`returns\` {String}`
    },
    'ifEven': {
        name: 'ifEven',
        category: 'comparison',
        brief: 'Returns true if the given value is an even number.',
        isBlock: true,
        synopsis: '{{[#]ifEven value}}',
        docs: `## {{ifEven}}

Return true if the given value is an even number.

### Params

- \`number\` {Number}
- \`options\` {Object}: Handlebars provided options object
- \`returns\` {String}: Block, or inverse block if specified and falsey.

### Example
~~~
{{#ifEven value}}
  render A
{{else}}
  render B
{{/ifEven}}
~~~`
    },
    'ifNth': {
        name: 'ifNth',
        category: 'comparison',
        brief: 'Conditionally renders a block if the remainder is zero when a operand is divided by b. If an inverse block is specified it will be rendered when the remainder is not zero.',
        isBlock: true,
        isBlockOnly: true,
        synopsis: '{{#ifNth a b}}',
        docs: `## {{ifNth}}

Conditionally renders a block if the remainder is zero when a operand is divided by b. If an inverse block is specified it will be rendered when the remainder is not zero.

### Params

- {}: {Number}
- {}: {Number}
- \`options\` {Object}: Handlebars provided options object
- \`returns\` {String}: Block, or inverse block if specified and falsey.
`
    },
    'ifOdd': {
        name: 'ifOdd',
        category: 'comparison',
        brief: 'Block helper that renders a block if value is an odd number. If an inverse block is specified it will be rendered when falsy.',
        isBlock: true,
        isBlockOnly: true,
        synopsis: '{{#ifOdd value}}',
        docs: `## {{ifOdd}}

Block helper that renders a block if value is an odd number. If an inverse block is specified it will be rendered when falsy.

### Params

- \`value\` {Object}
- \`options\` {Object}: Handlebars provided options object
- \`returns\` {String}: Block, or inverse block if specified and falsey.

### Example
~~~
{{#ifOdd value}}
  render A
{{else}}
  render B
{{/ifOdd}}
~~~`
    },
    'is': {
        name: 'is',
        category: 'comparison',
        brief: 'Block helper that renders a block if a is equal to b. If an inverse block is specified it will be rendered when falsy. Similar to eq but does not do strict equality.',
        isBlock: true,
        isBlockOnly: true,
        synopsis: '{{#is a b}}',
        docs: `## {{is}}

Block helper that renders a block if a is equal to b. If an inverse block is specified it will be rendered when falsy. Similar to eq but does not do strict equality.

### Params

- \`a\` {any}
- \`b\` {any}
- \`options\` {Object}: Handlebars provided options object
- \`returns\` {String}
`
    },
    'isnt': {
        name: 'isnt',
        category: 'comparison',
        brief: 'Block helper that renders a block if a is not equal to b. If an inverse block is specified it will be rendered when falsy. Similar to unlessEq but does not use strict equality for comparisons.',
        isBlock: true,
        isBlockOnly: true,
        synopsis: '{{#is a b}}',
        docs: `## {{isnt}}

Block helper that renders a block if a is not equal to b. If an inverse block is specified it will be rendered when falsy. Similar to unlessEq but does not use strict equality for comparisons.

### Params

- \`a\` {String}
- \`b\` {String}
- \`options\` {Object}: Handlebars provided options object
- \`returns\` {String}`
    },
    'lt': {
        name: 'lt',
        category: 'comparison',
        brief: 'Block helper that renders a block if a is less than b. If an inverse block is specified it will be rendered when falsy.',
        isBlock: true,
        isBlockOnly: true,
        synopsis: '{{#lt a b}}',
        docs: `## {{lt}}

Block helper that renders a block if a is less than b.

If an inverse block is specified it will be rendered when falsy. You may optionally use the compare="" hash argument for the second value.

### Params

- \`context\` {Object}
- \`options\` {Object}: Handlebars provided options object
- \`returns\` {String}: Block, or inverse block if specified and falsey.`
    },
    'lte': {
        name: 'lte',
        category: 'comparison',
        brief: 'Block helper that renders a block if a is less than or equal to b. If an inverse block is specified it will be rendered when falsy.',
        isBlock: true,
        isBlockOnly: true,
        synopsis: '{{#lte a b}}',
        docs: `## {{lte}}

Block helper that renders a block if a is less than or equal to b.

If an inverse block is specified it will be rendered when falsy. You may optionally use the compare="" hash argument for the second value.

### Params

- \`a\` {Sring}
- \`b\` {Sring}
- \`options\` {Object}: Handlebars provided options object
- \`returns\` {String}: Block, or inverse block if specified and falsey.`
    },
    'neither': {
        name: 'neither',
        category: 'comparison',
        brief: 'Block helper that renders a block if neither of the given values are truthy. If an inverse block is specified it will be rendered when falsy.',
        isBlock: true,
        isBlockOnly: true,
        synopsis: '{{#neither a b}}',
        docs: `## {{neither}}

Block helper that renders a block if neither of the given values are truthy. If an inverse block is specified it will be rendered when falsy.

### Params

- \`a\` {any}
- \`b\` {any}
- \`options\` {}: Handlebars options object
- \`returns\` {String}: Block, or inverse block if specified and falsey.
`
    },
    'unlessEq': {
        name: 'unlessEq',
        category: 'comparison',
        brief: 'Block helper that always renders the inverse block unless a is equal to b.',
        isBlock: true,
        isBlockOnly: true,
        synopsis: '{{#unlessEq a b}}',
        docs: `## {{unlessEq}}

Block helper that always renders the inverse block unless a is is equal to b.

### Params

- \`a\` {String}
- \`b\` {String}
- \`options\` {Object}: Handlebars provided options object
- \`returns\` {String}: Inverse block by default, or block if falsey.
`
    },
    'unlessGt': {
        name: 'unlessGt',
        category: 'comparison',
        brief: 'Block helper that always renders the inverse block unless a is greater than b.',
        isBlock: true,
        isBlockOnly: true,
        synopsis: '{{#unlessGt a b}}',
        docs: `## {{unlessGt}}

Block helper that always renders the inverse block unless a is is greater than b.

### Params

- \`a\` {Object}: The default value
- \`b\` {Object}: The value to compare
- \`options\` {Object}: Handlebars provided options object
- \`returns\` {String}: Inverse block by default, or block if falsey.
`
    },
    'unlessLt': {
        name: 'unlessLt',
        category: 'comparison',
        brief: 'Block helper that always renders the inverse block unless a is less than b.',
        isBlock: true,
        isBlockOnly: true,
        synopsis: '{{#unlessLt a b}}',
        docs: `## {{unlessLt}}

Block helper that always renders the inverse block unless a is is less than b.

### Params

- \`a\` {Object}: The default value
- \`b\` {Object}: The value to compare
- \`options\` {Object}: Handlebars provided options object
- \`returns\` {String}: Block, or inverse block if specified and falsey.
`
    },
    'unlessGteq': {
        name: 'unlessGteq',
        category: 'comparison',
        brief: 'Block helper that always renders the inverse block unless a is greater than or equal to b.',
        isBlock: true,
        isBlockOnly: true,
        synopsis: '{{#unlessGteq a b}}',
        docs: `## {{unlessGteq}}

Block helper that always renders the inverse block unless a is is greater than or equal to b.

### Params

- \`a\` {any}
- \`b\` {any}
- \`options\` {Object}: Handlebars provided options object
- \`returns\` {String}: Block, or inverse block if specified and falsey.
`
    },
    'unlessLteq': {
        name: 'unlessLteq',
        category: 'comparison',
        brief: 'Block helper that always renders the inverse block unless a is less than or equal to b.',
        isBlock: true,
        isBlockOnly: true,
        synopsis: '{{#unlessLteq a b}}',
        docs: `## {{unlessLteq}}

Block helper that always renders the inverse block unless a is is less than or equal to b.

### Params

- \`a\` {any}
- \`b\` {any}
- \`options\` {Object}: Handlebars provided options object
- \`returns\` {String}: Block, or inverse block if specified and falsey.
`
    },
    moment: {
        name: 'moment',
        category: 'date',
        brief: 'Use moment as a helper.',
        synopsis: '{{moment}}'
    },
    sanitize: {
        name: 'sanitize',
        category: 'html',
        brief: 'Strips HTML tags from a string, so that only the text nodes are preserved.',
        synopsis: '{{sanitize htmlString}}',
        docs: `## {{sanitize}}

Strip HTML tags from a string, so that only the text nodes are preserved.

### Params

- \`str\` {String}: The string of HTML to sanitize.
- \`returns\` {String}

### Example
~~~
{{sanitize "<span>foo</span>"}}
<!-- results in: 'foo' -->
~~~`
    },
    'ul': {
        name: 'ul',
        category: 'html',
        brief: 'Block helper for creating unordered lists (<ul></ul>).',
        isBlock: true,
        isBlockOnly: true,
        synopsis: "{{#ul context}}",
        docs: `## {{ul}}

Block helper for creating unordered lists (<ul></ul>)

### Params

- \`context\` {Object}
- \`options\` {Object}
- \`returns\` {String}
`
    },
    ol: {
        name: 'ol',
        category: 'html',
        brief: 'Block helper for creating ordered lists (<ol></ol>).',
        isBlock: true,
        isBlockOnly: true,
        synopsis: '{{#ol context}}',
        docs: `## {{ol}}

Block helper for creating ordered lists (<ol></ol>)

### Params

- \`context\` {Object}
- \`options\` {Object}
- \`returns\` {String}
`
    },
    thumbnailImage: {
        name: 'thumbnailImage',
        category: 'html',
        brief: 'Returns a <figure> with a thumbnail linked to a full picture.',
        synopsis: '{{thumbnailImage context}}',
        docs: `## {{thumbnailImage}}

Returns a <figure> with a thumbnail linked to a full picture

### Params

- \`context\` {Object}: Object with values/attributes to add to the generated elements:
- \`context.alt\` {String}
- \`context.src\` {String}
- \`context.width\` {Number}
- \`context.height\` {Number}
- \`returns\` {String}: HTML <figure> element with image and optional caption/link.
`
    },
    inflect: {
        name: 'inflect',
        category: 'inflection',
        brief: 'Returns either the singular or plural inflection of a word based on the given count.',
        synopsis: '{{inflect count singular plural [includeCount]}}',
        docs: `## {{inflect}}

Returns either the \`singular\` or \`plural\` inflection of a word based on the given count.

Params

- \`count\` {Number}
- \`singular\` {String}: The singular form
- \`plural\` {String}: The plural form
- \`includeCount\` {String}
- \`returns\` {String}

### Example
~~~
{{inflect 0 "string" "strings"}}
<!-- "strings" -->
{{inflect 1 "string" "strings"}}
<!-- "string" -->
{{inflect 1 "string" "strings" true}}
<!-- "1 string" -->
{{inflect 2 "string" "strings"}}
<!-- "strings" -->
{{inflect 2 "string" "strings" true}}
<!-- "2 strings" -->
~~~`
    },
    ordinalize: {
        name: 'ordinalize',
        category: 'inflection',
        brief: 'Returns an ordinalized number as a string.',
        synopsis: '{{ordinalize num}}',
        docs: `## {{ordinalize}}

Returns an ordinalized number as a string.

### Params

- \`val\` {String}: The value to ordinalize.
- \`returns\` {String}: The ordinalized number

### Example
~~~
{{ordinalize 1}}
<!-- '1st' -->
{{ordinalize 21}}
<!-- '21st' -->
{{ordinalize 29}}
<!-- '29th' -->
{{ordinalize 22}}
<!-- '22nd' -->
~~~`
    },
    'markdown': {
        name: 'markdown',
        category: 'markdown',
        brief: 'Block helper that converts a string of inline markdown to HTML.',
        isBlock: true,
        isBlockOnly: true,
        synopsis: '{{#markdown}}',
        docs: `## {{markdown}}

Block helper that converts a string of inline markdown to HTML.

### Params

- \`context\` {Object}
- \`options\` {Object}
- \`returns\` {String}

### Example
~~~
{{#markdown}}
# Foo
{{/markdown}}
<!-- results in: <h1>Foo</h1> -->
~~~`
    },
    add: {
        name: 'add',
        category: 'math',
        brief: 'Returns the sum of a plus b.',
        synopsis: '{{add a b}}',
        docs: `## {{add}}

Return the sum of a plus b.

### Params

- \`a\` {Number}
- \`b\` {Number}
- \`returns\` {Number}
`
    },
    avg: {
        name: 'avg',
        category: 'math',
        brief: 'Returns the average of all numbers in the given array.',
        synopsis: '{{avg array}}',
        docs: `## {{avg}}

Returns the average of all numbers in the given array.

### Params

- \`array\` {Array}: Array of numbers to add up.
- \`returns\` {Number}

### Example
~~~
{{avg "[1, 2, 3, 4, 5]"}}
<!-- results in: '3' -->
~~~`
    },
    ceil: {
        name: 'ceil',
        category: 'math',
        brief: 'Returns the Math.ceil() of the given value.',
        synopsis: '{{ceil value}}',
        docs: `## {{ceil}}

Get the \`Math.ceil()\` of the given value.

### Params

- \`value\` {Number}
- \`returns\` {Number}
`
    },
    divide: {
        name: 'divide',
        category: 'math',
        brief: 'Divides a by b.',
        synopsis: '{{divide a b}}',
        docs: `## {{divide}}

Divide a by b

### Params

- \`a\` {Number}: numerator
- \`b\` {Number}: denominator
`
    },
    floor: {
        name: 'floor',
        category: 'math',
        brief: 'Returns the Math.floor() of the given value.',
        synopsis: '{{floor value}}',
        docs: `## {{floor}}

Get the \`Math.floor()\` of the given value.

### Params

- \`value\` {Number}
- \`returns\` {Number}
`
    },
    multiply: {
        name: 'multiply',
        category: 'math',
        brief: 'Returns the product of a times b.',
        synopsis: '{{multiply a b}}',
        docs: `## {{multiply}}

Return the product of a times b.

### Params

- \`a\` {Number}: factor
- \`b\` {Number}: multiplier
- \`returns\` {Number}
`
    },
    random: {
        name: 'random',
        category: 'math',
        brief: 'Generates a random number between two values.',
        synopsis: '{{random min max}}',
        docs: `## {{random}}

Generate a random number between two values

### Params

- \`min\` {Number}
- \`max\` {Number}
- \`returns\` {String}
`
    },
    round: {
        name: 'round',
        category: 'math',
        brief: 'Rounds the given number.',
        synopsis: `{{round value}}`,
        docs: `## {{round}}

Round the given number.

### Params

- \`number\` {Number}
- \`returns\` {Number}
`
    },
    subtract: {
        name: 'subtract',
        category: 'math',
        brief: 'Returns the product of a minus b.',
        synopsis: '{{substract a b}}',
        docs: `## {{subtract}}

Return the product of a minus b.

### Params

- \`a\` {Number}
- \`a\` {Number}
- \`returns\` {Number}
`
    },
    sum: {
        name: 'sum',
        category: 'math',
        brief: 'Returns the sum of all numbers in the given array.',
        synopsis: '{{sum a b}}',
        docs: `## {{sum}}

Returns the sum of all numbers in the given array.

### Params

- \`array\` {Array}: Array of numbers to add up.
- \`returns\` {Number}

### Example
~~~
{{sum "[1, 2, 3, 4, 5]"}}
<!-- results in: '15' -->
~~~`
    },
    option: {
        name: 'option',
        category: 'misc',
        brief: 'Returns the given value of prop from this.options.',
        synopsis: '{{option propPath}}',
        docs: `## {{option}}

Return the given value of prop from this.options.

### Params

- \`prop\` {String}
- \`returns\` {any}

### Example
~~~
<!-- context = {options: {a: {b: {c: 'ddd'}}}} -->
{{option "a.b.c"}}
<!-- results => \`ddd\` -->
~~~`
    },
    'noop': {
        name: 'noop',
        category: 'misc',
        brief: 'Block helper that renders the block without taking any arguments.',
        isBlock: true,
        isBlockOnly: true,
        synopsis: '{{noop}}',
        docs: `## {{noop}}

Block helper that renders the block without taking any arguments.

### Params

- \`options\` {Object}
- \`returns\` {String}
`
    },
    'withHash': {
        name: 'withHash',
        category: 'misc',
        brief: 'Block helper that builds the context for the block from the options hash.',
        synopsis: '{{withHash options}}',
        isBlock: true,
        isBlockOnly: true,
        docs: `## {{withHash}}

Block helper that builds the context for the block from the options hash.

### Params

- \`options\` {Object}: Handlebars provided options object.
`
    },
    addCommas: {
        name: 'addCommas',
        category: 'number',
        brief: 'Adds commas to numbers.',
        synopsis: '{{addComas number}}',
        docs: `## {{addCommas}}

Add commas to numbers

### Params

- \`num\` {Number}
- \`returns\` {Number}
`
    },
    phoneNumber: {
        name: 'phoneNumber',
        category: 'number',
        brief: 'Converts a string or number to a formatted phone number.',
        synopsis: '{{phoneNumber numberStr}}',
        docs: `## {{phoneNumber}}

Convert a string or number to a formatted phone number.

### Params

- \`num\` {Number|String}: The phone number to format, e.g. \`8005551212\`
- \`returns\` {Number}: Formatted phone number: \`(800) 555-1212\`
`
    },
    toAbbr: {
        name: 'toAbbr',
        category: 'number',
        brief: 'Abbreviates numbers to the given number of precision. This is for general numbers, not size in bytes.',
        synopsis: '{{toAbbr number precision}}',
        docs: `## {{toAbbr}}

Abbreviate numbers to the given number of precision. This is for general numbers, not size in bytes.

### Params

- \`number\` {Number}
- \`precision\` {Number}
- \`returns\` {String}
`
    },
    toExponential: {
        name: 'toExponential',
        category: 'number',
        brief: 'Returns a string representing the given number in exponential notation.',
        synopsis: '{{toExponential number digits}}',
        docs: `## {{toExponential}}

Returns a string representing the given number in exponential notation.

### Params

- \`number\` {Number}
- \`fractionDigits\` {Number}: Optional. An integer specifying the number of digits to use after the decimal point. Defaults to as many digits as necessary to specify the number.
- \`returns\` {Number}

### Example
~~~
{{toExponential number digits}};
~~~`
    },
    toFixed: {
        name: 'toFixed',
        category: 'number',
        brief: 'Formats the given number using fixed-point notation.',
        synopsis: '{{toFixed number precision}}',
        docs: `##    {{toFixed}}

Formats the given number using fixed-point notation.

### Params

- \`number\` {Number}
- \`digits\` {Number}: (Optional) The number of digits to appear after the decimal point; this may be a value between 0 and 20. If this argument is omitted, it is treated as 0.
- \`returns\` {String}: A string representing the given number using fixed-point notation.

### Example
~~~
{{toFixed "1.1234" 2}}
//=> '1.12'
~~~`
    },
    toFloat: {
        name: 'toFloat',
        category: 'number',
        brief: '',
        synopsis: '{{toInt number}}'
    },
    toInt: {
        name: 'toInt',
        category: 'number',
        brief: '',
        synopsis: '{{toFloat number}}'
    },
    toPrecision: {
        name: 'toPrecision',
        category: 'number',
        brief: 'Returns a string representing the Number object to the specified precision.',
        synopsis: '{{toPrecicion number precision}}',
        docs: `## {{toPrecision}}

Returns a string representing the Number object to the specified precision.

### Params

- \`number\` {Number}
- \`precision\` {Number}: (Optional) An integer specifying the number of significant digits. If precison is not between 1 and 100 (inclusive), it will be coerced to 0.
- \`returns\` {String}: A string representing a Number object in fixed-point or exponential notation rounded to precision significant digits.

### Example
~~~
{{toPrecision "1.1234" 2}}
//=> '1.1'
~~~`
    },
    extend: {
        name: 'extend',
        category: 'object',
        brief: 'Extends the context with the properties of other objects. A shallow merge is performed to avoid mutating the context.',
        synopsis: '{{extend object[s]}}',
        docs: `## {{extend}}

Extend the context with the properties of other objects. A shallow merge is performed to avoid mutating the context.

### Params

- \`objects\` {Object}: One or more objects to extend.
- \`returns\` {Object}
`
    },
    'forIn': {
        name: 'forIn',
        category: 'object',
        brief: 'Block helper that iterates over the properties of an object exposing each key and value on the context.',
        synopsis: '{{#forIn context}}',
        isBlock: true,
        isBlockOnly: true,
        docs: `## {{forIn}}

Block helper that iterates over the properties of an object, exposing each key and value on the context.

### Params

- \`context\` {Object}
- \`options\` {Object}
- \`returns\` {String}
`
    },
    'forOwn': {
        name: 'forOwn',
        category: 'object',
        brief: 'Block helper that iterates over the own properties of an object, exposing each key and value on the context.',
        synopsis: '{{#forOwn context}}',
        isBlock: true,
        isBlockOnly: true,
        docs: `## {{forOwn}}

Block helper that iterates over the own properties of an object, exposing each key and value on the context.

### Params

- \`obj\` {Object}: The object to iterate over.
- \`options\` {Object}
- \`returns\` {String}
`
    },
    toPath: {
        name: 'toPath',
        category: 'object',
        brief: 'Takes arguments and, if they are string or number, converts them to a dot-delineated object property path.',
        synopsis: '{{toPath propSegments}}',
        docs: `## {{toPath}}

Take arguments and, if they are string or number, convert them to a dot-delineated object property path.

### Params

- \`prop\` {String|Number}: The property segments to assemble (can be multiple).
- \`returns\` {String}
`
    },
    get: {
        name: 'get',
        category: 'object',
        brief: 'Use property paths (a.b.c) to get a value or nested value from the context. Works as a regular helper or block helper.',
        synopsis: '{{[#]get propPath object}}',
        isBlock: true,
        docs: `## {{get}}

Use property paths (a.b.c) to get a value or nested value from the context. Works as a regular helper or block helper.

Params

- \`prop\` {String}: The property to get, optionally using dot notation for nested properties.
- \`context\` {Object}: The context object
- \`options\` {Object}: The handlebars options object, if used as a block helper.
- \`returns\` {String}
`
    },
    getObject: {
        name: 'getObject',
        category: 'object',
        brief: 'Use property paths (a.b.c) to get an object from the context. Differs from the get helper in that this helper will return the actual object including the given property key. This helper does not work as a block helper.',
        synopsis: '{{getObject prop object}}',
        docs: `## {{getObject}}

Use property paths (a.b.c) to get an object from the context. Differs from the get helper in that this helper will return the actual object, including the given property key. Also, this helper does not work as a block helper.

### Params

- \`prop\` {String}: The property to get, optionally using dot notation for nested properties.
- \`context\` {Object}: The context object
- \`returns\` {String}
`
    },
    hasOwn: {
        name: 'hasOwn',
        category: 'object',
        brief: 'Returns true if key is an own, enumerable property of the given context object.',
        synopsis: '{{hasOwn key object}}',
        docs: `## {{hasOwn}}

Return true if key is an own, enumerable property of the given context object.

### Params

- \`key\` {String}
- \`context\` {Object}: The context object.
- \`returns\` {Boolean}

### Example
~~~
{{hasOwn context key}}
~~~`
    },
    isObject: {
        name: 'isObject',
        category: 'object',
        brief: 'Returns true if value is an object.',
        synopsis: '{{isObject value}}',
        docs: `## {{isObject}}

Return true if value is an object.

### Params

- \`value\` {String}
- \`returns\` {Boolean}

### Example
~~~
{{isObject "foo"}}
//=> false
~~~`
    },
    'JSONparse': {
        name: 'JSONparse',
        category: 'object',
        brief: 'Parses the given string using JSON.parse.',
        isBlock: true,
        isBlockOnly: true,
        synopsis: '{{#JSONparse json}}',
        docs: `## {{JSONparse}}

Parse data with JSONparse.

### Parameters

- \`json\` {String}

### Example

~~~
{{#JSONparse '{"foo": "bar"}'}}
    {{foo}}
{{/JSONparse}}
<!-- output: bar -->
~~~`
    },
    'JSONstringify': {
        name: 'JSONstringify',
        category: 'object',
        brief: 'Stringifies an object using JSON.stringify.',
        synopsis: '{{#JSONstringify object}}',
        docs: `## {{JSONstringify}}

Stringify an object using JSON.stringify.

### Params

- \`obj\` {Object}: Object to stringify
- \`returns\` {String}

### Example
~~~
<!-- object: { foo: 'bar' } -->
{{JSONstringify object}}
<!-- results in: '{"foo": "bar"}' -->
~~~`
    },
    merge: {
        name: 'merge',
        category: 'object',
        brief: 'Deeply merges the properties of the given objects with the context object.',
        synopsis: '{{merge object objects}}',
        docs: `## {{merge}}

Deeply merge the properties of the given objects with the context object.

### Params

- \`object\` {Object}: The target object. Pass an empty object to shallow clone.
- \`objects\` {Object}
- \`returns\` {Object}
`
    },
    pick: {
        name: 'pick',
        category: 'object',
        brief: 'Picks properties from the context object.',
        synopsis: '{{pick properties object}}',
        isBlock: true,
        docs: `## {{pick}}

Pick properties from the context object.

### Params

- \`properties\` {Array|String}: One or more properties to pick.
- \`context\` {Object}
- \`options\` {Object}: Handlebars options object.
- \`returns\` {Object}: Returns an object with the picked values. If used as a block helper, the values are passed as context to the inner block. If no values are found, the context is passed to the inverse block.
`
    },
    camelcase: {
        name: 'camelcase',
        category: 'string',
        brief: 'camelCase the characters in the given string.',
        synopsis: '{{camelcase str}}',
        docs: `## {{camelcase}}

camelCase the characters in the given string.

### Params

- \`string\` {String}: The string to camelcase.
- \`returns\` {String}

Example
~~~
{{camelcase "foo bar baz"}};
<!-- results in:  'fooBarBaz' -->
~~~`
    },
    capitalize: {
        name: 'capitalize',
        category: 'string',
        brief: 'Capitalizes the first word in a sentence.',
        synopsis: '{{capitalize str}}',
        docs: `## {{capitalize}}

Capitalize the first word in a sentence.

### Params

- \`str\` {String}
- \`returns\` {String}

### Example
~~~
{{capitalize "foo bar baz"}}
<!-- results in:  "Foo bar baz" -->
~~~`
    },
    capitalizeAll: {
        name: 'capitalizeAll',
        category: 'string',
        brief: 'Capitalizes all words in a string.',
        synopsis: '{{capitalizeAll str}}',
        docs: `## {{capitalizeAll}}

Capitalize all words in a string.

### Params

- \`str\` {String}
- \`returns\` {String}

### Example
~~~
{{capitalizeAll "foo bar baz"}}
<!-- results in:  "Foo Bar Baz" -->
~~~`
    },
    center: {
        name: 'center',
        category: 'string',
        brief: 'Centers a string using non-breaking spaces.',
        synopsis: '{{center str}}',
        docs: `## {{center}}

Center a string using non-breaking spaces

### Params

- \`str\` {String}
- \`spaces\` {String}
- \`returns\` {String}
`
    },
    chop: {
        name: 'chop',
        category: 'string',
        brief: 'Like trim, but removes both extraneous whitespace and non-word characters from the beginning and end of a string.',
        synopsis: '{{chop str}}',
        docs: `## {{chop}}

Like trim, but removes both extraneous whitespace and non-word characters from the beginning and end of a string.

### Params

- \`string\` {String}: The string to chop.
- \`returns\` {String}

### Example
~~~
{{chop "_ABC_"}}
<!-- results in:  'ABC' -->

{{chop "-ABC-"}}
<!-- results in:  'ABC' -->

{{chop " ABC "}}
<!-- results in:  'ABC' -->
~~~`
    },
    dashcase: {
        name: 'dashcase',
        category: 'string',
        brief: 'Replaces non-word characters and periods with hyphens.',
        synopsis: '{{dashcase str}}',
        docs: `## {{dashcase}}

dash-case the characters in string. Replaces non-word characters and periods with hyphens.

### Params

- \`string\` {String}
- \`returns\` {String}

### Example
~~~
{{dashcase "a-b-c d_e"}}
<!-- results in:  'a-b-c-d-e' -->
~~~`
    },
    dotcase: {
        name: 'dotcase',
        category: 'string',
        brief: 'dot.case the characters in a string.',
        synopsis: '{{dotcase str}}',
        docs: `## {{dotcase}}

dot.case the characters in string.

### Params

- \`string\` {String}
- \`returns\` {String}

### Example
~~~
{{dotcase "a-b-c d_e"}}
<!-- results in:  'a.b.c.d.e' -->
~~~`
    },
    ellipsis: {
        name: 'ellipsis',
        category: 'string',
        brief: 'Truncates a string to the specified length, and appends it with an elipsis, ….',
        synopsis: '{{ellipsis str}}',
        docs: `## {{ellipsis}}

Truncates a string to the specified length, and appends it with an elipsis, ….

### Params

- \`str\` {String}
- \`length\` {Number}: The desired length of the returned string.
- \`returns\` {String}: The truncated string.

### Example
~~~
{{ellipsis (sanitize "<span>foo bar baz</span>"), 7}}
<!-- results in:  'foo bar…' -->
{{ellipsis "foo bar baz", 7}}
<!-- results in:  'foo bar…' -->
~~~`
    },
    hyphenate: {
        name: 'hyphenate',
        category: 'string',
        brief: 'Replaces spaces in a string with hyphens.',
        synopsis: '{{hyphenate str}}',
        docs: `## {{hyphenate}}

Replace spaces in a string with hyphens.

### Params

- \`str\` {String}
- \`returns\` {String}

### Example
~~~
{{hyphenate "foo bar baz qux"}}
<!-- results in:  "foo-bar-baz-qux" -->
~~~`
    },
    isString: {
        name: 'isString',
        category: 'string',
        brief: 'Returns true if value is a string.',
        synopsis: '{{isString value}}',
        docs: `## {{isString}}

Return true if value is a string.

### Params

- \`value\` {String}
- \`returns\` {Boolean}

### Example
~~~
{{isString "foo"}}
<!-- results in:  'true' -->
~~~`
    },
    lowercase: {
        name: 'lowercase',
        category: 'string',
        brief: 'Lowercase all characters in the given string.',
        synopsis: '{{lowercase str}}',
        docs: `## {{lowercase}}

Lowercase all characters in the given string.

### Params

- \`str\` {String}
- \`returns\` {String}

### Example
~~~
{{lowercase "Foo BAR baZ"}}
<!-- results in:  'foo bar baz' -->
~~~`
    },
    pascalcase: {
        name: 'pascalcase',
        category: 'string',
        brief: 'PascalCase the characters in a string.',
        synopsis: '{{pascalcase str}}',
        docs: `## {{pascalcase}}

PascalCase the characters in string.

### Params

- \`string\` {String}
- \`returns\` {String}

### Example
~~~
{{pascalcase "foo bar baz"}}
<!-- results in:  'FooBarBaz' -->
~~~`
    },
    pathcase: {
        name: 'pathcase',
        category: 'string',
        brief: 'path/case the characters in a string.',
        synopsis: '{{pathcase str}}',
        docs: `## {{pathcase}}

path/case the characters in string.

### Params

- \`string\` {String}
- \`returns\` {String}

### Example
~~~
{{pathcase "a-b-c d_e"}}
<!-- results in:  'a/b/c/d/e' -->
~~~`
    },
    plusify: {
        name: 'plusify',
        category: 'string',
        brief: 'Replaces spaces in the given string with pluses.',
        synopsis: '{{plusify str}}',
        docs: `## {{plusify}}

Replace spaces in the given string with pluses.

### Params

- \`str\` {String}: The input string
- \`returns\` {String}: Input string with spaces replaced by plus signs

### Example
~~~
{{plusify "foo bar baz"}}
<!-- results in:  'foo+bar+baz' -->
~~~`
    },
    reverse: {
        name: 'reverse',
        category: 'string',
        brief: 'Reverses a string.',
        synopsis: '{{reverse str}}',
        docs: `## {{reverse}}

Reverse a string.

### Params

- \`str\` {String}
- \`returns\` {String}

### Example
~~~
{{reverse "abcde"}}
<!-- results in:  'edcba' -->
~~~`
    },
    sentence: {
        name: 'sentence',
        category: 'string',
        brief: 'Sentence case the given string.',
        synopsis: '{{sentence str}}',
        docs: `## {{sentence}}

Sentence case the given string

### Params

- \`str\` {String}
- \`returns\` {String}

### Example
~~~
{{sentence "hello world. goodbye world."}}
<!-- results in:  'Hello world. Goodbye world.' -->
~~~`
    },
    snakecase: {
        name: 'snakecase',
        category: 'string',
        brief: 'snake_case the characters in the given string.',
        synopsis: '{{snakecase str}}',
        docs: `## {{snakecase}}

snake_case the characters in the given string.

### Params

- \`string\` {String}
- \`returns\` {String}

### Example
~~~
{{snakecase "a-b-c d_e"}}
<!-- results in:  'a_b_c_d_e' -->
~~~`
    },
    split: {
        name: 'split',
        category: 'string',
        brief: 'Splits a string by the given character.',
        synopsis: '{{split str character}}',
        docs: `## {{split}}

Split string by the given character.

### Params

- \`string\` {String}: The string to split.
- \`returns\` {String} character: Default is an empty string.

### Example
~~~
{{split "a,b,c" ","}}
<!-- results in:  ['a', 'b', 'c'] -->
~~~`
    },
    startsWith: {
        name: 'startsWith',
        category: 'string',
        brief: 'Tests whether a string begins with the given prefix.',
        synopsis: '{{startsWith str prefix}}',
        isBlock: true,
        docs: `## {{startsWith}}

Tests whether a string begins with the given prefix.

### Params

- \`prefix\` {String}
- \`testString\` {String}
- \`options\` {String}
- \`returns\` {String}

### Example
~~~
{{#startsWith "Goodbye" "Hello, world!"}}
  Whoops
{{else}}
  Bro, do you even hello world?
{{/startsWith}}
~~~`
    },
    titleize: {
        name: 'titleize',
        category: 'string',
        brief: 'Title case the given string.',
        synopsis: '{{titleize str}}',
        docs: `## {{titleize}}

Title case the given string.

### Params

- \`str\` {String}
- \`returns\` {String}

### Example
~~~
{{titleize "this is title case"}}
<!-- results in:  'This Is Title Case' -->
~~~`
    },
    trim: {
        name: 'trim',
        category: 'string',
        brief: 'Removes extraneous whitespace from the beginning and end of a string.',
        synopsis: '{{trim str}}',
        docs: `## {{trim}}

Removes extraneous whitespace from the beginning and end of a string.

### Params

- \`string\` {String}: The string to trim.
- \`returns\` {String}

### Example
~~~
{{trim " ABC "}}
<!-- results in:  'ABC' -->
~~~`
    },
    uppercase: {
        name: 'uppercase',
        category: 'string',
        brief: 'Uppercase all of the characters in the given string. If used as a block helper it will uppercase the entire block. This helper does not support inverse blocks.',
        synopsis: '{{[#]uppercase str}}',
        isBlock: true,
        docs: `## {{uppercase}}

Uppercase all of the characters in the given string. If used as a block helper it will uppercase the entire block. This helper does not support inverse blocks.

### Params

- \`str\` {String}: The string to uppercase
- \`options\` {Object}: Handlebars options object
- \`returns\` {String}

### Example
~~~
{{uppercase "aBcDeF"}}
<!-- results in:  'ABCDEF' -->
~~~`
    },
    encodeURI: {
        name: 'encodeURI',
        category: 'url',
        brief: 'Encodes a Uniform Resource Identifier (URI) component by replacing each instance of certain characters by one, two, three, or four escape sequences representing the UTF-8 encoding of the character.',
        synopsis: '{{encodeURI str}}',
        docs: `## {{encodeURI}}

Encodes a Uniform Resource Identifier (URI) component by replacing each instance of certain characters by one, two, three, or four escape sequences representing the UTF-8 encoding of the character.

### Params

- \`str\` {String}: The un-encoded string
- \`returns\` {String}: The endcoded string
`
    },
    decodeURI: {
        name: 'decodeURI',
        category: 'url',
        brief: 'Decodes a Uniform Resource Identifier (URI) component.',
        synopsis: '{{decodeURI uri}}',
        docs: `## {{decodeURI}}

Decode a Uniform Resource Identifier (URI) component.

### Params

- \`str\` {String}
- \`returns\` {String}
`
    },
    urlResolve: {
        name: 'urlResolve',
        category: 'url',
        brief: 'Takes a base URL and a href URL and resolves them as a browser would for an anchor tag.',
        synopsis: '{{urlResolve url}}',
        docs: `## {{urlResolve}}

Take a base URL, and a href URL, and resolve them as a browser would for an anchor tag.

### Params

- \`base\` {String}
- \`href\` {String}
- \`returns\` {String}
`
    },
    urlParse: {
        name: 'urlParse',
        category: 'url',
        brief: 'Parses a URL string into an object.',
        synopsis: '{{urlParse url}}',
        docs: `## {{urlParse}}

Parses a url string into an object.

### Params

- \`str\` {String}: URL string
- \`returns\` {String}: Returns stringified JSON
`
    },
    stripProtocol: {
        name: 'stripProtocol',
        category: 'url',
        brief: 'Strips protocol from a URL. Useful for displaying media that may have an `http` protocol on secure connections.',
        synopsis: '{{stripProtocol url}}',
        docs: `## {{stripProtocol}}

Strip protocol from a url. Useful for displaying media that may have an 'http' protocol on secure connections.

### Params

- \`str\` {String}
- \`returns\` {String}: the url with http protocol stripped

### Example
~~~
<!-- url = 'http://foo.bar' -->
{{stripProtocol url}}
<!-- results in: '//foo.bar' -->
~~~`
    }
};
