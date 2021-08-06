# Sivujetti developer docs

Source code of Sivujetti developer docs website. Uses [jekyll](jekyllrb.com/).

## Running locally

1. https://jekyllrb.com/docs/installation/
1. cd fi
    - `bundle exec jekyll serve --port 4000`
    - http://localhost:4000
1. cd en
    - `cp -R ../fi/_sass _sass`
    - `cp -R ../fi/assets assets`
    - `bundle exec jekyll serve --port 4001`
    - http://localhost:4001

## Building locally

1. `mv _config.yml _config.dev.yml && mv _config.prod.yml _config.yml`
1. `bundle exec jekyll build`
1. `mv _config.yml _config.prod.yml && mv _config.dev.yml _config.yml`

## License

CC BY-SA
