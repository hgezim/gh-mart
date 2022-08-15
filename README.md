## Requirements

Ensure you have Node version 16 installed. For example:

```
$ node --version
v16.15.0
```

## Getting started

To run crowmart in a development server, first install the required packages:

```npm install```

Then run:

```npm run dev```

You will then see output like this:

```
VITE v3.0.7  ready in 198 ms

  ➜  Local:   http://127.0.0.1:5174/
  ➜  Network: use --host to expose
```

Load the above URL (Local) in your browser and interact with the app.

## Approach

I took the approach of doing the minimum minification of the original HTML files as I realize we likely won't have that ability with black crow clients as well.
