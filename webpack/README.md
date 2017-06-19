# React Starter

## webpack/
The `webpack/` directory includes the webpack config files for development and production.

## Builds
A development and production build exist for both the "app" and "server" projects, along with the corresponding npm scripts.

| Script Command | Description |
|----------------|-------------|
| `app:dev`      | Start webpack-dev-server (in-memory) with hot module reloading
| `app:clean`    | Clean the app build directory
| `app:prod`     | Build the app for production
| `server:dev`   | Start webpack watch on server files with nodemon reloading
| `server:clean` | Clean the server build directory
| `server:prod`  | Build the server for production
| `server:start` | Start the node server

## Aliases
Webpack aliases use Webpack's ability to link directories in order to simplify importing file paths.

| Alias         | Path     |
|---------------|----------|
| `@components` | `src/components`
| `@common`     | `src/common`
| `@styled`     | `src/styled`
| `@assets`     | `src/assets`

```javascript
import App from '@common/App';
```

## Loaders
There are several loaders in both development and production builds to enhance development.

### Images
Images use the url-loader (Base64 embed) until they reach a certain size, after which they are placed in the `images/` build folder (and the import URL updated). The production build includes an extra compression and minimization step to lower bundle size.

**NOTE:** There is a plugin to "enable" webpack imports from within image `src` attributes (_babel-plugin-transform-react-jsx-img-import_) but it currently doesn't support `{ modules: false }` `.babelrc` fix for Hot Module Reloading.

```javascript
import imageUrl from '@assets/images/test.png';

return <img src={imageUrl} alt="image" />;
```

### Images (CSS)
Images in CSS (as backgrounds) use the same loading system as regular image imports but can use aliases (due to import syntax).

```css
body {
  background-image: url('~@assets/images/test.png');
}
```

### Fonts
Fonts use either the url-loader or file-loader depending on type and size, and are placed in the `fonts/` build folder if necessary. The `~` before the alias notifies css-loader that a "module" is being loaded.

```css
body {
  @font-face {
    font-family: 'Montserrat';
    src: url('~@assets/fonts/Montserrat-Regular.ttf');
  }
}
```
