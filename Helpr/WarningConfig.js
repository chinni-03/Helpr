// WarningConfig.js

import { LogBox } from 'react-native';

// Suppress specific warnings or all warnings
const suppressWarnings = () => {
  // Suppress all warnings
  LogBox.ignoreAllLogs(); 

  // Alternatively, suppress specific warnings
  // LogBox.ignoreLogs(['Warning: ...']); // Add specific warning patterns to ignore
};

export default suppressWarnings;
