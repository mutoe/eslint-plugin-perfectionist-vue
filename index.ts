import type { FlatConfig } from '@typescript-eslint/utils/ts-eslint'

import sortVueAttributes from './rules/sort-vue-attributes'

interface BaseOptions {
  type: 'alphabetical' | 'line-length' | 'natural'
  order: 'desc' | 'asc'
}

type RuleSeverity = 'error' | 'warn' | 'off'

type RuleDeclaration = [RuleSeverity, Object?]

let name = 'perfectionist-vue'

let plugin = {
  rules: {
    'sort-vue-attributes': sortVueAttributes,
  },
  name,
}

let getRules = (options: BaseOptions): Record<string, RuleDeclaration> =>
  Object.fromEntries(
    Object.entries(plugin.rules).reduce(
      (accumulator: [string, RuleDeclaration][], [ruleName, ruleValue]) =>
        ruleValue.meta.deprecated
          ? accumulator
          : [...accumulator, [`${name}/${ruleName}`, ['error', options]]],
      [],
    ),
  )

let createConfig = (options: BaseOptions): FlatConfig.Config => ({
  plugins: {
    [name]: plugin,
  },
  rules: getRules(options),
})

export default {
  ...plugin,
  configs: {
    'recommended-alphabetical': createConfig({
      type: 'alphabetical',
      order: 'asc',
    }),
    'recommended-natural': createConfig({
      type: 'natural',
      order: 'asc',
    }),
  },
}
