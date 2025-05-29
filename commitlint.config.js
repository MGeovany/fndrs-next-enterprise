import fs from "fs"

import yaml from "yaml"

const config = yaml.parse(fs.readFileSync("./git-conventional-commits.yaml", "utf8"))

export default {
  rules: {
    "type-enum": [2, "always", config.convention.commitTypes],
    "scope-enum": config.convention.commitScopes.length ? [2, "always", config.convention.commitScopes] : [0],
    "subject-empty": [2, "never"],
    "type-empty": [2, "never"],
  },
}
