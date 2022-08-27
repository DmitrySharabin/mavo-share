# Mavo Share

Have you ever wanted the users of your app to be able to share their data (text, links, and other content)? Search no more!

The plugin allows end-users to share their data via system clipboard, email, contacts or messaging applications, and Bluetooth or Wi-Fi channels (via all means that the underlying operating system and the users' browser support).

You can see this plugin in action in the [Mavordle](https://dmitrysharabin.github.io/mavo-wordle/) game. You need to guess the word first, though. 😜

## Usage

The plugin extends [Mavo actions](https://mavo.io/docs/actions) with a new one—the `share()` function. It means you can use it inside the `mv-action` attribute.

The `share()` function supports up to 3 parameters (**in any order**):

1. `text` — text being shared
2. `url` — URL referring to a resource being shared
3. `title` — title of the document being shared.

**Note:** To specify the value for the needed parameter, you should specify the _name_ of that parameter followed by a _colon_, and the _value_ of the parameter, like so: `parameter: value`.

**Note:** Depending on the operating system and the user's browser, `title` may be ignored by the _target_ the user will pick in the share dialog.

### Summary

`share(url: "URL_to_share")`

`share(text: "Text_to_share")`

`share(title: "Title_to_share")`

`share(text: "Text_to_share", url: "URL_to_share")`

`share(text: "Text_to_share", title: "Title_to_share")`

`share(url: "URL_to_share", title: "Title_to_share")`

`share(text: "Text_to_share", url: "URL_to_share", title: "Title_to_share")`

`share("URL_to_share")` is equivalent to `share(url: "URL_to_share")`

`share()` — share the URL and the title of the current page

**Note:** The plugin supports _relative_ URLs. For example, if the URL of the current page is `https://mavo.io/demos`, `share("?login")` will share the following URL: `https://mavo.io/demos?login`.

## Demo 1

```markup
<div mv-app mv-plugins="share">
  <button mv-action="share(text: 'Mavo is awesome! 😍')">
    share(text)
  </button>

  <button mv-action="share('https://mavo.io')">
    share(url)
  </button>

  <button mv-action="share(url: 'https://mavo.io', title: 'Get to know Mavo')">
    share(url, title)
  </button>
</div>

<style>
  button {
    padding: 0.5em;
    font: inherit;
  }
</style>
```

***

Like all the other actions, the `share()` function knows how to handle [properties](https://mavo.io/docs/properties) and [expressions](https://mavo.io/docs/expressions).

## Demo 2

```markup
<div mv-app mv-plugins="share">
  <p>What would you like to share?</p>

  <form mv-action="share(text: text, url: url, title: title)">
    <label>
      Text: <input property="text" placeholder="e.g., Mavo is awesome!" />
    </label>
    <label>
      URL: <input property="url" placeholder="e.g., https://mavo.io" />
    </label>
    <label>
      Title: <input property="title" placeholder="e.g., Mavo website" />
    </label>

    <input type="submit" value="Share" />
  </form>
</div>
<style>
  form {
    display: grid;
    gap: 0.3em;
    grid-template-columns: auto auto;
    align-items: center;
  }

  label {
    display: contents;
  }

  input {
    padding: 0.3em;
    font: inherit;
  }

  [type=submit] {
    margin-block-start: 0.5em;
    padding: 0.5em;
  }
</style>
```
