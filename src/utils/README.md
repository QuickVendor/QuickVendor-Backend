# Utils

This directory contains utility functions and helpers.

## Guidelines
- Pure functions without side effects
- Well-documented and tested
- Organized by functionality

Example:
```javascript
// formatters.js
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};
```
