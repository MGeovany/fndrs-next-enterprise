/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs")
const yaml = require("yaml")

const config = yaml.parse(fs.readFileSync("./git-conventional-commits.yaml", "utf8"))

module.exports = {
  rules: {
    "type-enum": [2, "always", config.convention.commitTypes],
    "scope-enum": config.convention.commitScopes.length ? [2, "always", config.convention.commitScopes] : [0],
    "subject-empty": [2, "never"],
    "type-empty": [2, "never"],
  },
}
