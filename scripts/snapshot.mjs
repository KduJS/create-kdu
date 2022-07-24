#!/usr/bin/env zx
import 'zx/globals'

$.verbose = false

const featureFlags = ['typescript', 'jsx', 'router']

// The following code & comments are generated by GitHub CoPilot.
function fullCombination(arr) {
  const combinations = []

  // for an array of 5 elements, there are 2^5 - 1= 31 combinations
  // (excluding the empty combination)
  // equivalent to the following:
  // [0, 0, 0, 0, 1] ... [1, 1, 1, 1, 1]
  // We can represent the combinations as a binary number
  // where each digit represents a flag
  // and the number is the index of the flag
  // e.g.
  // [0, 0, 0, 0, 1] = 0b0001
  // [1, 1, 1, 1, 1] = 0b1111

  // Note we need to exclude the empty combination in our case
  for (let i = 1; i < 1 << arr.length; i++) {
    const combination = []
    for (let j = 0; j < arr.length; j++) {
      if (i & (1 << j)) {
        combination.push(arr[j])
      }
    }
    combinations.push(combination)
  }

  return combinations
}

const flagCombinations = fullCombination(featureFlags)
flagCombinations.push(['default'])

// `--with-tests` are equivalent of `--witest --cypress`
// Previously it means `--cypress` without `--witest`.
// Here we generate the snapshots only for the sake of easier comparison with older templates.
// They may be removed in later releases.
// const withTestsFlags = fullCombination(['typescript', 'jsx', 'router']).map((args) => [
//   ...args,
//   'with-tests'
// ])
// withTestsFlags.push(['with-tests'])
//
// flagCombinations.push(...withTestsFlags)

const playgroundDir = path.resolve(__dirname, '../playground/')
const bin = path.posix.relative('../playground/', '../outfile.cjs')

cd(playgroundDir)
for (const flags of flagCombinations) {
  const projectName = flags.join('-')
  
  console.log(`Removing previously generated project ${projectName}`)
  await $`rm -rf ${projectName}`

  console.log(`Creating project ${projectName}`)
  await $`node ${[bin, projectName, ...flags.map((flag) => `--${flag}`), '--force']}`
}
