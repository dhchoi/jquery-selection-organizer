// TODO: Create test file for following cases
//
// 1. Behavioral Test Cases
//   a. when there is no selected child
//     - adding from either end
//       > should not animate
//     - adding from middle
//       > should animate if set so
//   b. when there is only one selected child
//     - adding
//       - element adjacent to selected list
//         > should not animate
//       - element not adjacent to selected list
//         > should animate if set so
//     - removing
//       - element
//         > should not animate
//   c. when there is more than one selected child
//     - adding
//       - element adjacent to selected list
//         > should not animate
//       - element not adjacent to selected list
//         > should animate if set so
//     - removing
//       - element adjacent to non-selected list
//         > should not animate
//       - element not adjacent to non-selected list
//			> should animate if set so
//
// 2. Settings Test Cases
//   a. childSelector
//   b. selectedChildClass
//   c. showAnimation
//   d. animation
//   e. animationSpeed
//   f. reverse
//   g. callback