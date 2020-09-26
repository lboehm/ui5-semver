# Semantic versioning  UI5 manifest.json

Semantic versioning? Never heard of it? Here you go: [https://semver.org/](https://semver.org/)

Semantic versioning is widely known and used in NPM, but for updating version information in `manifest.json` of a web application I couldn't find a npm package. So I wrote one myself.

# CLI Usage

```
Usage: ui5-semver <command> [options]

Commands:
  ui5-semver increment  increment given version category of manifest.json
  ui5-semver specify    specify version of manifest.json

Options:
  --version   Show version number                                      [boolean]
  --help, -h  Show help                                                [boolean]
```

## increment

```
ui5-semver increment

increment given version category of manifest.json

Positionals:
  category, c  version category to increment
                [string] [choices: "major", "minor", "patch"] [default: "patch"]

Options:
  --version   Show version number                                      [boolean]
  --help, -h  Show help                                                [boolean]
```

## specify

```
ui5-semver specify

specify version of manifest.json

Positionals:
  number, n  version number to set, format <X.X.X> with X = integer from 0 to
             999                                                        [string]

Options:
  --version   Show version number                                      [boolean]
  --help, -h  Show help                                                [boolean]
```

# Contribute

Would be great if you contribute. There's lots of room for improvement. See [CONTRIBUTING.md](CONTRIBUTING.md).

# License

MIT © [Lukas Böhm](https://github.com/lboehm)