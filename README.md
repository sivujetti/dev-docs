# Sivujetti developer docs

Source code of Sivujetti developer docs website. Uses [jekyll](jekyllrb.com/).

## Running locally

1. https://jekyllrb.com/docs/installation/
1. cd fi
    - `bundle exec jekyll serve`
    - http://localhost:4000
1. cd en
    - `cp -R ../fi/_sass _sass`
    - `cp -R ../fi/assets assets`
    - `bundle exec jekyll serve --port 4001`
    - http://localhost:4001

## Building locally

1. Build fi
```
cd fi &&\
 mv _config.yml _config.dev.yml && mv _config.prod.yml _config.yml &&\
 bundle exec jekyll build &&\
 mv _config.yml _config.prod.yml && mv _config.dev.yml _config.yml &&\
 cd ..
```

2. Build en
```
cd en &&\
 mv _config.yml _config.dev.yml && mv _config.prod.yml _config.yml &&\
 bundle exec jekyll build &&\
 mv _config.yml _config.prod.yml && mv _config.dev.yml _config.yml &&\
 cd ..
```

3. Combine & patch to /_sitefinal
```
mkdir _sitefinal ; mkdir _sitefinal/fi ; mkdir _sitefinal/en &&\
 mv fi/_site/assets _sitefinal/assets/ &&\
 mv fi/_site/* _sitefinal/fi/ &&\
 rm -R en/_site/assets &&\
 mv en/_site/* _sitefinal/en &&\
 node ./patch.js
```

## License

CC BY-SA
