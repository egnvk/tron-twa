const config = {
  '*.{js,jsx,json}': ['eslint --cache --fix', 'prettier --write'],
  '*.{ts,tsx}': [
    () => 'tsc --skipLibCheck --noEmit',
    'eslint --cache --fix',
    'prettier --write'
  ],
  '*.css': ['prettier --write']
}

export default config
