# shubin123.github.io

Sends the bare user address, https://shubin123.github.io/, to the
[portfolio](https://shubin123.github.io/portfolio/). The redirect is
host-relative (`/portfolio/`), so a copy works for any account.

## Use it for your own account

1. Fork [Shubin123/portfolio](https://github.com/Shubin123/portfolio) and turn
   on Pages for it. The guide is in that repo's README.
2. Click **Use this template → Create a new repository** here, or fork this
   repo and rename the fork.
3. Name the new repo `<your-username>.github.io`. The name must match your
   username exactly.
4. In **Settings → Pages**, set the source to `main`, `/ (root)` if it isn't
   set already.
5. Visit `https://<your-username>.github.io/`. It opens your portfolio.

If you renamed your portfolio repo, replace `/portfolio/` in `index.html`
with `/<new-name>/`.

## Tests

`npm test` serves `index.html` locally and checks that it redirects to
`/portfolio/` on the same host, keeping any query string and hash.
`LIVE=1 npm test` also checks the deployed site. GitHub Actions runs both on
every push and pull request, and the live check daily.
