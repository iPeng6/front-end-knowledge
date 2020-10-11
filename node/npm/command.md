# 常用命令

https://docs.npmjs.com/cli-documentation/

## Install a package

```bash
npm install [<@scope>/]<name>@<version|tag>
npm install <git-host>:<git-user>/<repo-name>
npm install <git repo url>

aliases: npm i, npm add
```

- **-P, --save-prod**: Package will appear in your dependencies. This is the default unless -D or -O are present.
- **-D, --save-dev**: Package will appear in your devDependencies.
- **-O, --save-optional**: Package will appear in your optionalDependencies.
- **-E, --save-exact**: Saved dependencies will be configured with an exact version rather than using npm’s default semver range operator.
- **-g, --global**: Install the current package as a global package
- **--no-save**: Prevents saving to dependencies.

## Remove a package

```bash
npm uninstall [<@scope>/]<pkg>[@<version>]... [-S|--save|-D|--save-dev|-O|--save-optional|--no-save]

aliases: remove, rm, r, un, unlink
```

## List installed packages

```bash
npm -g list --depth=0

/Users/<username>/.nvm/versions/node/v12.18.3/lib
├── npm@6.14.6
└── yarn@1.22.10
```
