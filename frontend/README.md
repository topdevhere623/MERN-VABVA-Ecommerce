## How to use

```bash
npm run dev

# to build
npm run build
npm run start

# to analyze bundle
npm run analyze

# to run Storybook
npm run storybook

# to update packages
npm update --legacy-peer-deps
```

The website should be up and running on [http://localhost:3202](http://localhost:3202) as for `dev` as for `production` modes.

# Environment Variables
Need to create or modify ***.env.local*** file according to content of ***.env.local.example***.
```
NEXT_PUBLIC_SERVER_URL=http://localhost:3002
...
```
