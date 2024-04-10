<div align="center">
  <h1>monorepo cli</h1>
  <p>Made for fun</p>
</div>

# install pnpm

```
npm install pnpm -g
```

# install dependencies

```
pnpm install
```

# run app

```
pnpm start
```

# build app

```
pnpm build
```

# link repos

```
pnpm add [repo_name] --filter [target_repo] --workspace

or

pnpm link [repo_name]
```

# add new repo

```
cd packages
md [repo_name]
cd [repo_name]
pnpm init
```
